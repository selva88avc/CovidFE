import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Covid } from '../model/covid';
@Injectable({
  providedIn: 'root'
})
export class CovidService {
  removeBookmark(id: number): Observable<String> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
        'Authorization': "Bearer " + this.getToken()
      })
    };
    return this.httpClient.delete<String>("http://localhost:9091/bookmark/delete?id="+id, httpOptions);
  }
  saveToken(data: any) {
    sessionStorage.setItem("token", data.token);
  }
  private currentUser: BehaviorSubject<String|null>;
  constructor(private httpClient: HttpClient) { 
    this.currentUser = new BehaviorSubject<String|null>(sessionStorage.getItem("user"));
  }

  public get currentUserValue(): String|null {
    this.currentUser = new BehaviorSubject<String|null>(sessionStorage.getItem("user"));
    if(this.currentUser) {
      return this.currentUser.value;
    } else {
      return null;
    }
  }
  showData(): Observable<any> {
    return this.httpClient.get("http://localhost:3000/employee");
  }
  login(username: string, password: string): Observable<any> {
    return this.httpClient.post("http://localhost:9091/authentication", { "username": username, "password": password })
      .pipe(map(resp => {
        this.currentUser.next(username);
        sessionStorage.setItem("user", username);
        return resp;
      }), catchError(val => this.handleError(val)));
  }
  saveUser(user: any): Observable<any> {
    return this.httpClient.post("http://localhost:9091/userprofile/save", user);
  }
  getCovidData(): Observable<any> {
    return this.httpClient.get("http://localhost:9091/covid/view");
  }

  getBookmarks(): Observable<Covid[]> {
    console.log('save covid');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + this.getToken()
      })
    };
    return this.httpClient.get<Covid[]>("http://localhost:9091/bookmark/view", httpOptions);
      
  }

  getToken() {
    return sessionStorage.getItem("token");
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Message: ${error.error.reason}`;
    }
    return throwError(errorMessage);
  }

  saveToBookmark(covid: Covid): Observable<Covid> {
    console.log('save covid');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + this.getToken()
      })
    };
    return this.httpClient.post<Covid>("http://localhost:9091/bookmark/save", covid, httpOptions)
      .pipe(map(covid => {
        return covid;
      }), catchError(val => this.handleError(val)));
  }
  logout() {
    // remove user from local storage and set current user to null
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.currentUser.next(null);
}

}
