import { Component, OnInit } from '@angular/core';
// import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import User from '../../../model/User'
import { AuthenticationService } from '../../service/authentication.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TestBed } from '@angular/core/testing';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private userCollection: AngularFirestoreCollection<User>;
  listuser;
  model;
  user;
  checksua: boolean = false
  submitted: boolean = false
  checktao: boolean = true
  ngForm: FormGroup;
  vitri = ["", "Nhân viên tư Vấn", "Kế toán", "Quản lý", "Nhân viên bán thời gian"]
  constructor(private Authenticaton: AuthenticationService, private fb: FormBuilder, private readonly afs: AngularFirestore, private AngularAuth: AngularFireAuth) {
    this.createForm()
    this.userCollection = this.afs.collection<User>("User");
  }

  ngOnInit() {
    this.listuser = new Array<User>()
    this.userCollection.snapshotChanges().subscribe(data => {

      let list = Object.assign(data)
      list.forEach(element => {
        this.listuser.push(element.payload.doc.data())
      })
      console.log(this.listuser)
      this.innitdatable(this.listuser)
    })
    // .valueChanges() is simple. It just returns the 
    // JSON data without metadata. If you need the 
    // doc.id() in the value you must persist it your self
    // or use .snapshotChanges() instead. 
    this.user = new User();


  }
  get f() { return this.ngForm.controls; }
  getUser() {

    this.userCollection.snapshotChanges().subscribe(data => {
      this.listuser = [];
      let list = Object.assign(data)
      list.forEach(element => {
        this.listuser.push(element.payload.doc.data())
      })
      console.log(this.listuser)
      this.updatedatable(this.listuser)
    })

  }
  createForm() {
    this.ngForm = this.fb.group({
      tenNguoiDung: ['', Validators.required],
      email: ['', Validators.required],
      diaChi: ['', Validators.required],
      gioiTinh: ['', Validators.required],
      ngaySinh: ['', Validators.required],
      viTri: ['', Validators.required],

    });
  }

  // selectToday() {
  //   this.model = this.calendar.getToday();
  // }
  tao() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.ngForm.invalid) {
      return;
    } else {
      let email = this.user.email
      let pass = "123456"
      this.AngularAuth.auth.createUserWithEmailAndPassword(email, pass).then(res => {
        let user = Object.assign(res);
        this.userCollection.doc(user.user.uid).set({
          id: user.user.uid,
          tenNguoiDung: this.user.tenNguoiDung,
          viTri: this.user.viTri,
          gioiTinh: this.user.gioiTinh,
          ngaySinh: this.user.ngaySinh,
          diaChi: this.user.diaChi,
          email: this.user.email
        })
        this.listuser = []
        this.getUser()
        this.user = new User()
      });
      window.alert("Thêm thành công")
      this.submitted = false
    }

  }

  sua() {
    console.log(this.user)
    this.userCollection.doc(this.user.id).update({

      tenNguoiDung: this.user.tenNguoiDung,
      viTri: this.user.viTri,
      gioiTinh: this.user.gioiTinh,
      ngaySinh: this.user.ngaySinh,
      diaChi: this.user.diaChi,
      email: this.user.email
    })

    this.getUser();

  }

  innitdatable(data) {
    var enviromenttypescript = this;


    let table = $('#datatables').DataTable({
      data: data,
      destroy: true,
      columns: [
        {
          "render": function (data, type, row, meta) {
            return row.tenNguoiDung

          }
        },
        {
          "render": function (data, type, row, meta) {
            return row.email

          }
        },
        {
          "render": function (data, type, row, meta) {
            return row.ngaySinh

          }
        },
        {
          "render": function (data, type, row, meta) {
            if (row.viTri == 'Nhân viên tư Vấn') {
              return '  <button style="width:150px" type="submit" class="btn btn-info pull-left">' + row.viTri + '</button>'
            }
            if (row.viTri == 'Kế toán') {
              return '  <button style="width:150px" type="submit" class="btn btn-info pull-left">' + row.viTri + '</button>'
            }
            if (row.viTri == 'Quản lý') {
              return '  <button style="width:150px" type="submit" class="btn btn-info pull-left">' + row.viTri + '</button>'
            }
            if (row.viTri == 'Nhân viên bán thời gian') {
              return '  <button style="width:150px" type="submit" class="btn btn-info pull-left">' + row.viTri + '</button>'
            }

          }
        },


      ]

    });
    $('#datatables tbody').on('click', 'tr', function () {
      var data = Object.assign(table.row(this).data());
      enviromenttypescript.checksua = true;
      enviromenttypescript.checktao = false;
      enviromenttypescript.user = data

      // this.checktao=false
      // this.checksua=true




    });

  }
  updatedatable(data) {
    console.log(data)

    $('#datatables').DataTable()
      .clear()
      .rows.add(data)
      .draw();
  }
}
