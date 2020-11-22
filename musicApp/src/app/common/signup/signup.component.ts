import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(form){
    console.log(form.value)
    this.userService.signup(form.value)
    .subscribe((result:any) => {
      console.log(result.result._id);
      console.log(result.result.name);
      localStorage.setItem('id', result.result._id);
      localStorage.setItem('name', result.result.name);
      this.router.navigateByUrl('/')
    });
  }
}
