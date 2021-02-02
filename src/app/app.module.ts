import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MemberComponent } from './member/member.component';
import { AdjudicatorComponent } from './adjudicator/adjudicator.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { AdjudicatorDetailsComponent } from './adjudicator/adjudicator-details/adjudicator-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    MemberComponent,
    AdjudicatorComponent,
    MemberListComponent,
    AdjudicatorDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
