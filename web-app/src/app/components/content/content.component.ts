import { Component, OnInit } from '@angular/core';
		import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
    import { Observable } from 'rxjs'
    import  Item from '../../../model/Item'
		// export interface Item { id: string; name: string; }
    import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/service/authentication.service';
@Component({
  selector: 'app-content',
  // templateUrl: './content.component.html',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
 email:String
  private itemsCollection: AngularFirestoreCollection<Item>;
  items:Item[];
  constructor(private auth:AuthenticationService) { }
  displayName:string="";

  ngOnInit() {
  this.auth.getCurrentUser().then(
    user=> this.displayName = user.displayName!=null? user.displayName: user.email    );
  
 
 
    
  }

  
  Logout(){
    this.auth.SignOut();
    
  }
  
}
