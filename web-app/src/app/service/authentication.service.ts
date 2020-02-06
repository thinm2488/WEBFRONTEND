import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth,private cookies: CookieService) {
    this.userData = angularFireAuth.authState;
  }

  /* Sign up */
  // SignUp(email: string) {
  //   let password='123456'
  //   this.angularFireAuth
  //     .auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(res => {
         
  //       window.alert('Successfully signed up!');
  //       // window.location.href='/home'
  //       return res
  //     })
  //     .catch(error => {
  //       window.alert( error.message);
  //     });    
  // }

  /* Sign in */
  SignIn(email: string, password: string) {
     this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
          
        
        window.location.href='/home/dashboard'
      })
      .catch(err => {
        window.alert(err.message);
      });
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth
      .auth
      .signOut();
      window.alert("Đăng xuất thành công!")
     
      window.location.href="/"
  }  
  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('profile');
      provider.addScope('email');
      this.angularFireAuth.auth
      .signInWithPopup(provider)
      .then(res => {

     
    
      resolve(res);
      window.location.href="/home/dashboard" //Hàm resolve returns a Promise object that is resolved with a given value
      }, err => {
      console.log(err);
      reject(err);
      })
    })
    }
    getCurrentUser(){
			return new Promise<any>((resolve, reject) => {
			  var user = firebase.auth().onAuthStateChanged(function(user){
				if (user) {
          // this.cookies.set("email",user.email) 
    
     
    
          resolve(user);
         
				} else {				 
				  reject('No user logged in');
				}
			  })
      })
    }	
}