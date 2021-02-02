import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MemberComponent } from './member/member.component';
import { AdjudicatorComponent } from './adjudicator/adjudicator.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { AdjudicatorDetailsComponent } from './adjudicator/adjudicator-details/adjudicator-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    {path : 'memberlist', component: MemberListComponent},
    { path: 'memberlist/:emailId', component: MemberComponent },
    {path : 'addmember', component: MemberComponent},
    {path : 'adjudicator', component : AdjudicatorComponent},
    {path : 'adjudicator/:emailId', component : AdjudicatorDetailsComponent},
    { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
