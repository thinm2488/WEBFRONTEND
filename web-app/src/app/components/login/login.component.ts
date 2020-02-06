import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import{AuthenticationService} from '../../service/authentication.service';
import { MovieService } from '../../service/movie.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  constructor(private test:MovieService, private fb: FormBuilder,public authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.createForm()
   
  }
  createForm() {
    this.angForm = this.fb.group({
      UserName: ['', Validators.required ],
      PassWord: ['', Validators.required ],
     
    });
  }
  Login(username,password){
    this.authenticationService.SignIn(username,password);
  }
  tryGoogleLogin(){
    this.authenticationService.doGoogleLogin()
    .then(res => {
      // window.location.href="/home/dashboard"
    })
    }

}
