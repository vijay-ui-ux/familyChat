import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private socket$: WebSocketSubject<any>;
  private api = environment.url
  constructor(private http: HttpClient) {
    this.socket$ = webSocket('ws://192.168.1.66:3000/');
  }

  public getMessageUpdates() {
    return this.socket$.asObservable();
  }

  public sendMessage(message: any) {
    this.socket$.next(message);
  }
  //get calls
  public getFriendsList() :Observable<any> {
    return this.http.get(`${this.api}/getFriends`)
  }

  //post calls
  public emailVerification(mailId): Observable<any> {
    return this.http.post(`${this.api}/sendOTP`, mailId)
  }

  public sendOtp(otp): Observable<any> {
    return this.http.post(`${this.api}/verifyOTP`, otp)
  }

  public setActiveChat(data) : Observable<any> {
    return this.http.post(`${this.api}/activeChat`, data)
  }


  public sendUser(user): Observable<any> {
    return this.http.post(`${this.api}/register`, user)
  }
}
