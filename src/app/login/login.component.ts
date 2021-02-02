import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  message = '';
  constructor(private _registrationService : RegistrationService, private _router : Router) { }

  ngOnInit(): void {
  }
  
  loginUser(){
    this._registrationService.loginUserFromRemote(this.user).subscribe(
      data => {
        this._registrationService.username = data.emailId;
        if(data.role === "Member"){
          this._router.navigate(['./memberlist'])
        }else{
          this._router.navigate(['./adjudicator'])
        }
        console.log("response received")
    },
      error => {
        this.message = "Bad Credentials, please enter valid emailId and password"
        console.log("exception occered")
      }
    )
  }

}
