import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { APP_CONSTANTS } from '../constants/app.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  registor():Observable<any>{
    return this.http.get(`${APP_CONSTANTS.SERVICE_BASE_URL}${APP_CONSTANTS.API.REGISTOR}`)
  }
  postRegister(data:any):Observable<any>{
    return this.http.post(`${APP_CONSTANTS.SERVICE_BASE_URL}${APP_CONSTANTS.API.REGISTOR}`,data)
  }
  getTeam():Observable<any>{
    return this.http.get(`${APP_CONSTANTS.SERVICE_BASE_URL}${APP_CONSTANTS.API.TEAMLIST}`)
  }
}
