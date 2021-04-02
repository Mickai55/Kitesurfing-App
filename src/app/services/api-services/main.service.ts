import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private url: string = 'https://5ddbb358041ac10014de140b.mockapi.io';
  
  constructor(private http: HttpClient) { }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
      withCredentials: false,
    };
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      if (error.status == 401) {
        console.log('ACCESS DENIED!');
      }
      return of(result as T);
    };
  }


  getSpots(): Observable<any> {
    return this.http
      .get(this.url + '/spot') 
      .pipe(
        tap((response) => response),
        catchError(this.handleError('getSpots'))
      );
  }

  register(data: any): Observable<any> {
    return this.http
      .post('http://localhost:8443/api/users/register', data, this.getHeaders())
      .pipe(
        tap((response) => console.log(response)),
        catchError(this.handleError('registerDemoAPI'))
      );
  }

  login(data: any): Observable<any> {
    return this.http
      .get('http://localhost:8443/api/users/login' + '?email=' + data.email + '&password=' + data.password, this.getHeaders())
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
          console.log(response)
        })
      );
  }
  // login(data: any): Observable<any> {
  //   return this.http
  //     .post('http://localhost:3000/users/login', data, this.getHeaders())
  //     .pipe(
  //       tap((response) => {
  //         localStorage.setItem('token', response.token);
  //       })
  //     );
  // }



}
