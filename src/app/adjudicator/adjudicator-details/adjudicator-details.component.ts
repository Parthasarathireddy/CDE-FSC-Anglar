import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/app/services/registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/model/member';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-adjudicator-details',
  templateUrl: './adjudicator-details.component.html',
  styleUrls: ['./adjudicator-details.component.css']
})
export class AdjudicatorDetailsComponent implements OnInit {

  member = new Member();
  constructor(private _registrationService : RegistrationService,private route :  ActivatedRoute, private router :  Router) { }

  ngOnInit(): void {
    //this.memberByEmailId(this.route.params);
    this.route.params.pipe(map(p => p.emailId),switchMap(emailId => {
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
  approve(emailId) {
    this._registrationService.updateMemberUserByEmailFromRemote(emailId, this.member).subscribe(
      data => {
        this.member = data;
        this.member.status = "Approved";
        this._registrationService.memberUserFromRemote(this.member).subscribe(
          data => {
            this.router.navigate(['../adjudicator']);
            console.log("response received" + data)
        }),
        error => {
          console.log("exception occered" + error)
        }
        console.log("response received" + data);
      },
      error => {
        console.log("exception occered" + error)
      }
    )
  }
  reject(emailId) {
    this._registrationService.updateMemberUserByEmailFromRemote(emailId, this.member).subscribe(
      data => {
        this.member = data;
        this.member.status = "Rejected";
        this._registrationService.memberUserFromRemote(this.member).subscribe(
          data => {
            this.router.navigate(['../adjudicator']);
            console.log("response received" + data)
        }),
        error => {
          console.log("exception occered" + error)
        }
        console.log("response received" + data);
      },
      error => {
        console.log("exception occered" + error)
      }
    )
  }
}
