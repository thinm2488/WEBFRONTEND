import { Component, OnInit, destroyPlatform } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Movie from 'src/model/Movie';
import { MovieService } from 'src/app/service/movie.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  listmovie;
  model;
  table
  submitted: boolean = false
  movie: Movie
  ngForm: FormGroup;
  theloai = ["Tình cảm", "Kinh Dị", "Hoạt Hình", "Viễn Tưởng", "Hành Động", "Nhạc Kịch", "Khác..."]
  trangThai = ["Dự Kiến", "Đã Phát Hành", "Đang khởi chiếu"]
  checksua: boolean = false
  checktao: boolean = true
  filterkey: []
  constructor(private fb: FormBuilder, private mv: MovieService, private cookies: CookieService) {
    this.createForm()
  }

  ngOnInit() {
    this.movie = new Movie()
    this.mv.getallmovie().subscribe(data => {
      this.listmovie = Object.assign(data)

      this.innitdatable(this.listmovie)

    })

  }
  getmovies() {
    this.mv.getallmovie().subscribe(data => {
      this.listmovie = Object.assign(data)

      this.updatedatable(this.listmovie)

    })
  }
  createForm() {

    this.ngForm = this.fb.group({


      tenPhim: ['', Validators.required],
      moTa: ['', Validators.required],
      ngayPhatHanh: ['', Validators.required],
      theLoai: ['', Validators.required],
      trangthai: ['', Validators.required]

    });
  }
  back() {
    this.checktao = true
    this.checksua = false;
    this.movie = new Movie()
  }
  // selectToday() {
  //   this.model = this.calendar.getToday();
  // }
  get f() { return this.ngForm.controls; }
  tao() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.ngForm.invalid) {
        return;
    }else{
      console.log(this.movie)
      let data = {
  
        nguoiTao: this.cookies.get("email"),
        theLoai: this.movie.theLoai,
        ngayPhatHanh: this.movie.ngayPhatHanh,
        tenPhim: this.movie.tenPhim,
        moTa: this.movie.moTa,
        trangThai: this.movie.trangThai
  
      }
      this.mv.create(data).subscribe(data => {
        let res = Object.assign(data)
        if (res.status == 200) {
          window.alert("Thêm Thành công")
  
          this.getmovies()
          this.movie = new Movie();
        } else {
          window.alert("Đã có lỗi xảy ra")
        }
  
      })
      this.submitted=false
    }
   

  }
  sua() {
    console.log(this.movie)
    let data = {
      id: this.movie.id,
      nguoiTao: this.cookies.get("email"),
      theLoai: this.movie.theLoai,
      ngayPhatHanh: this.movie.ngayPhatHanh,
      tenPhim: this.movie.tenPhim,
      moTa: this.movie.moTa,
      trangThai: this.movie.trangThai

    }

    this.mv.update(data).subscribe(data => {
      let res = Object.assign(data)
      if (res.status == 200) {
        window.alert("Sửa Thành công")

        this.getmovies()

      } else {
        window.alert("Đã có lỗi xảy ra")
      }

    })
  }
  xoa() {

    let data = {
      id: this.movie.id,

    }
    this.mv.delete(data).subscribe(data => {
      let res = Object.assign(data)
      if (res.status == 200) {
        window.alert(" Xóa Thành công")

        this.getmovies()

      } else {
        window.alert("Đã có lỗi xảy ra")
      }

    })
    this.movie=new Movie();
  }


  tam = []
  filter(e, item) {
    if (e.target.checked) {
      this.tam.push(item);
      console.log(this.tam);
      let listafterfilter = []
      for (let i = 0; i < this.tam.length; i++) {
        for (let j = 0; j < this.listmovie.length; j++) {
          //console.log(this.listmovie[j].tenPhim)
          //console.log(this.listmovie[j].trangThai)
          if (this.tam[i] == this.listmovie[j].trangThai) {

            listafterfilter.push(this.listmovie[j])

          }
        }
        console.log(listafterfilter)
      }
      this.updatedatable(listafterfilter)
    }
    else {
      let updateItem = this.tam.find(this.findIndexToUpdate, item);

      let index = this.tam.indexOf(updateItem);
      let listafterfilter = []
      this.tam.splice(index, 1);

      if (this.tam.length == 0) {
        this.updatedatable(this.listmovie)
      } else {

        for (let i = 0; i < this.tam.length; i++) {

          for (let j = 0; j < this.listmovie.length; j++) {

            if (this.tam[i] == this.listmovie[j].trangThai) {

              listafterfilter.push(this.listmovie[j])

            }
          }
        }
        this.updatedatable(listafterfilter)
      }
    }
  }
  findIndexToUpdate(type) {
    console.log(type)
    return type.id === this;
  }
  innitdatable(data) {





    var enviromenttypescript = this;
    // if(enviromenttypescript.table){
    //   enviromenttypescript.table.destroy()
    // }

    var table = $('#datatables').DataTable(

      {

        data: data,
        destroy: true,


        columns: [
          {
            "render": function (data, type, row, meta) {
              return row.tenPhim

            }
          },
          {
            "render": function (data, type, row, meta) {
              return row.ngayPhatHanh

            }
          },
          {
            "render": function (data, type, row, meta) {
              return row.theLoai

            }
          },
          {
            "render": function (data, type, row, meta) {
              if (row.trangThai == 'Dự Kiến') {
                return '  <button style="width:150px" type="submit" class="btn btn-info pull-left">' + row.trangThai + '</button>'
              }
              if (row.trangThai == 'Đã Phát Hành') {
                return '  <button style="width:150px" type="submit" class="btn btn-primary pull-left">' + row.trangThai + '</button>'
              }
              if (row.trangThai == 'Đang khởi chiếu') {
                return '  <button style="width:150px;"  type="submit" class="btn btn-success pull-left">' + row.trangThai + '</button>'
              }

            }
          }

        ]

      });


    $('#datatables tbody').on('click', 'tr', function () {


      let res = Object.assign(table.row(this).data());

      enviromenttypescript.movie = res
      enviromenttypescript.checksua = true;
      enviromenttypescript.checktao = false




      // this.checktao=false
      // this.checksua=true




    });

    //   $('#sua').click( function () {


    //    enviromenttypescript.sua();

    //    enviromenttypescript.checksua=true;
    //    enviromenttypescript.checktao=false
    //     // this.checktao=false
    //     // this.checksua=true

    //     $('#sua').data('row', $(this).closest('tr'));


    //   });
    //   $('#xoa').click(function(){
    //     enviromenttypescript.xoa();
    //     enviromenttypescript.checksua=true;
    //     enviromenttypescript.checktao=false
    //      // this.checktao=false
    //      // this.checksua=true
    //      $('#xoa').data('row', $(this).closest('tr'));
    // });




  }
  updatedatable(data) {
    console.log(data)

    $('#datatables').DataTable()
      .clear()
      .rows.add(data)
      .draw();
  }
}
