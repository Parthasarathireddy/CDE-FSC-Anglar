import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Member } from '../model/member';
import { TokenService } from '../token.service';
import { tap, catchError } from 'rxjs/operators';

const OAUTH_CLIENT = 'express-client';
const OAUTH_SECRET = 'express-secret';
const API_URL = 'http://localhost:8090/';
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'Basic ' + btoa (OAUTH_CLIENT + OAUTH_SECRET),
    'Access-Control-Allow-Origin': "null"
  })
};

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  redirectUrl = '';
  username : String;

  private static handleError(error : HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent){
      console.error("An Error occured : ", error.error.message);
    }else{
      console.error(`Backend Return Code ${error.status}`,
      `body was : ${error.status}`
      );
    }
    return throwError(
      'Some thing bad happend, please try again later'
    );
  }
  private static log(message : string): any {
    console.log(message);
  }

  constructor(private _http : HttpClient, private tokenService : TokenService) { }

  public loginUserFromRemote(user : User):Observable<any>{
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
    .set('emailId', user.emailId)
    .set('password', user.password)
    .set('role',user.role);
    return this._http.post<any>(API_URL + 'login', user, HTTP_OPTIONS).pipe(
      tap(res => {
        this.tokenService.saveToken(res.access_token),
        this.tokenService.saveRefreshToken(res.saveRefreshToken);
      }),
      catchError(RegistrationService.handleError)
    )
    //return this._http.post<any>("http://localhost:8090/login", user)
  }

  refreshToken(refreshData : any):Observable<any>{
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
    .set('refresh_token', refreshData.refresh_token)
    .set('grant_type','refresh_token');
    return this._http.post<any>(API_URL + 'login', body, HTTP_OPTIONS).pipe(
      tap(res => {
        this.tokenService.saveToken(res.access_token),
        this.tokenService.saveRefreshToken(res.saveRefreshToken);
      }),
      catchError(RegistrationService.handleError)
    )
    //return this._http.post<any>("http://localhost:8090/login", user)
  }
  logout(): void {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
  }

  public registerUserFromRemote(user : User):Observable<any>{
    const url = API_URL + "registeruser";
    return this._http.post<any>(url, user)
    .pipe(tap (RegistrationService.log('register')),
    catchError(RegistrationService.handleError))
   // return this._http.post<any>("http://localhost:8090/registeruser", user)
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
