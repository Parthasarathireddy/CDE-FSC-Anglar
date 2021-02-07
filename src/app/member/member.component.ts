import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Member } from '../model/member';
import { RegistrationService } from '../services/registration.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  member = new Member();
  message = '';
  coutries = [];
  fileToUpload: any;

  statesAndCountries = [{
    name: "India", states: ["Karnataka", "Telangana", "Andhra Pradesh"]
  },
  {
    name: "USA", states: ["California", "Florida", "Indiapolis"],
  }]
  meritalStatus = [
    { key: 'Married', value: 'Married', isSelected: true },
    { key: 'Single', value: 'Single', isSelected: false }
  ];
  states: Array<any>;
  constructor(private _registrationService: RegistrationService, private _router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.pipe(map(p => p.emailId), switchMap(emailId => {
      if (emailId === 'addMember') { return of(new Member()); }
      return this._registrationService.memberUserByEmailFromRemote(emailId)
    })
    )
      .subscribe(member => {
        this.member = member;
      },
        err => {
        }
      );
  }
  memberUser() {
    this.member.submittedUser = this._registrationService.username;
    this.member.status = "Review In-Progress";
    this._registrationService.memberUserFromRemote(this.member).subscribe(
      data => {
       this.member.imageSrc = 'data:image/jpeg;base64,'  + data.imageSrc;
        this._router.navigate(['./memberlist'])
        console.log("response received")
        this.message = "Submitted Successfully!";
      },
      error => {
        this.message = error.error.message;
        console.log("exception occered")
      }
    )
  }

  onSelectCountry(count) {
    this.states = this.statesAndCountries.find(con => con.name === count).states;
  }
}
