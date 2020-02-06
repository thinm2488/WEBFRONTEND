import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
checkpage:String
  constructor() { }

  ngOnInit() {
  
  }

click(value){
  
    this.checkpage=value.target.textContent
  
 

}
}
