import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/model/member';
import { RegistrationService } from 'src/app/services/registration.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  constructor(private _registrationService : RegistrationService, private _router : Router, private _route : ActivatedRoute) { }
  members : Member [];
  member = new Member();
  ngOnInit(): void {
    this.getAllMembers();
  }

  memberByEmailId(emailId) {
    this._registrationService.memberUserByEmailFromRemote(emailId).subscribe(
      data => {
        console.log("response received" + data);
      },
      error => {
        console.log("exception occered")
      }
    )
  }

  getAllMembers() {
    this._registrationService.findAllMembersFromRemote().subscribe(
      data => {
       // data.filter(datam => datam.submittedUser === this._registrationService.username);
        this.members = data.filter(datamem => datamem.submittedUser === this._registrationService.username);
        console.log("response received" + data);
      },
      error => {
        console.log("exception occered" + error);
      }
    )
  }

}
