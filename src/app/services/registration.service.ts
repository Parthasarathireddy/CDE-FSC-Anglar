import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Member } from '../model/member';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  username : String;

  constructor(private _http : HttpClient) { }

  public loginUserFromRemote(user : User):Observable<any>{
    return this._http.post<any>("http://localhost:8090/login", user)
  }
  public registerUserFromRemote(user : User):Observable<any>{
    return this._http.post<any>("http://localhost:8090/registeruser", user)
  }
  public memberUserFromRemote(member : Member):Observable<any>{
    return this._http.post<any>("http://localhost:8090/memberuser", member)
  }
  public findAllMembersFromRemote():Observable<any>{
    return this._http.get<any>("http://localhost:8090/allmember")
  }
  public memberUserByEmailFromRemote(member):Observable<any>{
    return this._http.get<any>("http://localhost:8090/member/" + member)
  }
  public updateMemberUserByEmailFromRemote(emailId, member):Observable<any>{
    return this._http.put<any>("http://localhost:8090/member/" + emailId, member)
  }
  public getCountiesData(member):Observable<any>{
    return this._http.get<any>("http://localhost:4020/counties.json")
  }
}
