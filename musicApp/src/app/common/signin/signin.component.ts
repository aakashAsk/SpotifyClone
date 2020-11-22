import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(form){
    this.userService.signin(form.value)
    .subscribe((result:any) => {
      console.log(result)
      localStorage.setItem('id', result._id);
      localStorage.setItem('name', result.name);
      this.router.navigateByUrl('/')
    })
  }
}
