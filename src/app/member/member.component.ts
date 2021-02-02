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

  statesAndCountries = [{
    name: "INDIA", states: ["KARNATAKA", "TELENGANA", "ANDHRAPRADESH"]
  },
  {
    name: "USA", states: ["CALIFORNIA", "FLORIDA", "INDIAPOLIS"],
  }]
  countiesee = [{
    "INDIA": {
      "KARNATAKA": ["BANGALORE", "UDUPI", "MANGALORE"],
      "TELENGANA": ["HYDERABAD", "WARANGAL"],
      "ANDHRAPRADESH": ["VIJAYAWADA", "KURNOOL"]
    },
    "USA": {
      "CALIFORNIA": ["SAN JOSE", "SAN HOSE", "NEW YORK"],
      "FLORIDA": ["MIAMI", "DENVER"],
      "INDIAPOLIS": ["INDIANA", "MASACHUTTEUS"]
    },
    "AUSTRALIA": {
      "NEW SOUTH WALES": ["SYDNEY", "BRISBANE"],
      "QUEENSLAND": ["PERTH", "VICTORIA"],
      "WESTERN AUSTRALIA": ["MELBOURNE", "MCG"]
    }
  }]
  meritalStatus = [
    { key: 'Married', value: 'Married', isSelected: true },
    { key: 'Single', value: 'Single', isSelected: false }
  ];
  states:Array<any>;
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
    this.member.status = "Pending";
    this._registrationService.memberUserFromRemote(this.member).subscribe(
      data => {
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
