import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'musicApp';
  uname;
  constructor(private router:Router){}
  
  ngOnInit(): void {
    if(localStorage.getItem('id') === null){
      this.uname=localStorage.getItem('name');
      this.router.navigateByUrl('signin');
    }
  }
}
