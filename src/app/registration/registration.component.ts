import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../model/user';
import { RegistrationService } from '../services/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user = new User();
  message = '';
  role = [
    { key: 'Member', value: 'Member', isSelected: true },
    { key: 'Adjudicator', value: 'Adjudicator', isSelected: false }
  ];
  guardianType = [
    { key: 'Father', value: 'Father', isSelected: true },
    { key: 'Mother', value: 'Mother', isSelected: false }
  ];
  accountType = [
    { key: 'Saving', value: 'Saving', isSelected: true },
    { key: 'Current', value: 'Current', isSelected: false }
  ];
  gender = ['Male', 'Female'];
  currentDate:Date = new Date();

  //currentDate = new Date().getDate();
  constructor(private _registrationService: RegistrationService, private _router : Router) { 
    this.maxDate.setDate(this.maxDate.getDate() + 1);
  }
  maxDate = new Date();
  ngOnInit(): void {
    this.maxDate = new Date();
  }
  registerUser(){
    this._registrationService.registerUserFromRemote(this.user).subscribe(
      data => {
        this._router.navigate(['./login'])
        console.log("response received")
        this.message = "Registration Successful"
    },
      error => {
        this.message = error.error.message;
        
        
        console.log("exception occered")
      }
    )
  }

}
