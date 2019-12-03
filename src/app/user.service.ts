import { Injectable } from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static url = 'http://localhost:8080/';
  token = new BehaviorSubject<string>(null);
  constructor(private http: HttpClient) { }

  login(){}

  loginUser(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.post(UserService.url + "login", user, {
      headers: headers
    });
  }

  saveUser(user: any): Observable<any> {
    return this.http.post(UserService.url + "registration", user);
  }
}
