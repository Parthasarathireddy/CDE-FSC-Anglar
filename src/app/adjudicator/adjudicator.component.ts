import { Component, OnInit } from '@angular/core';
import { Member } from '../model/member';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-adjudicator',
  templateUrl: './adjudicator.component.html',
  styleUrls: ['./adjudicator.component.css']
})
export class AdjudicatorComponent implements OnInit {
  members: Member[];
  member = new Member();
  headers = [];
  message ='';
  isEmail = false;
  constructor(private _registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.getAllMembers();
  }

  getAllMembers() {
    this._registrationService.findAllMembersFromRemote().subscribe(
      data => {
        this.headers = ['ID', 'Email', 'Name', 'Marital Status', 'Phone Number', 'Status'];
        let status = ["Approved","Rejected"];
        let membersData = data.filter(datastatus => datastatus.status === "Pending");
        this.members = membersData;
        console.log("response received" + data);
      },
      error => {
        console.log("exception occered")
      }
    )
  }
  memberByEmailId(emailId) {
    this.isEmail = true;
    this._registrationService.memberUserByEmailFromRemote(emailId).subscribe(
      data => {
        this.member = data;
        console.log("response received" + data);
      },
      error => {
        console.log("exception occered")
      }
    )
  }
}


