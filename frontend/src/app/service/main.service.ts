import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { APP_CONSTANTS } from '../constants/app.constants';
import { currentBid, getAcuHistory } from '../model/main';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http : HttpClient) { }

  history = new BehaviorSubject([])
  $getHistory = this.history.asObservable()

  updateHistory(data:any){
    this.history = data
  }

  

getCurrentUser():Observable<any>{
  return this.http.get(`${APP_CONSTANTS.SERVICE_BASE_URL}${APP_CONSTANTS.API.CURRENTUSER}`)
}
  getCurrentBid(): Observable<any>{
    return this.http.get(`${APP_CONSTANTS.SERVICE_BASE_URL}${APP_CONSTANTS.API.CURRENTBID}`)
  }
  postCurrentBid(postdata:any): Observable<any>{
    return this.http.post(`${APP_CONSTANTS.SERVICE_BASE_URL}${APP_CONSTANTS.API.CURRENTBID}`, postdata)
  }
  deleteCurrentBid(id:string): Observable<any>{
    return this.http.delete(`${APP_CONSTANTS.SERVICE_BASE_URL}${APP_CONSTANTS.API.CURRENTBID}/${id}`)
  }
  getCurrentHistory():Observable<any>{
    return this.http.get(`${APP_CONSTANTS.SERVICE_BASE_URL}${APP_CONSTANTS.API.CURRENTAUTHIS}`)
  }
  postCurrentHistory(data:any):Observable<any>{
    return this.http.post(`${APP_CONSTANTS.SERVICE_BASE_URL}${APP_CONSTANTS.API.CURRENTAUTHIS}`, data)
  }
  deleteCurrentHistory(id:string):Observable<any>{
    return this.http.delete(`${APP_CONSTANTS.SERVICE_BASE_URL}${APP_CONSTANTS.API.CURRENTAUTHIS}/${id}`)
  }
  deleteAllCurrentHistory():Observable<any>{
    return this.http.delete(`${APP_CONSTANTS.SERVICE_BASE_URL}${APP_CONSTANTS.API.CURRENTAUTHIS}`)
  }
  updateCompleteList(data:any){
    return this.http.post(`${APP_CONSTANTS.SERVICE_BASE_URL}${APP_CONSTANTS.API.COMPLETEDLIST}`, data)
  }
  getCompleteList(){
    return this.http.get(`${APP_CONSTANTS.SERVICE_BASE_URL}${APP_CONSTANTS.API.COMPLETEDLIST}`)
  }
}
