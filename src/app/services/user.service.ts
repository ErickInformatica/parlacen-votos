import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  public headers = new HttpHeaders().set('Content-Type', 'application/json');
  public headersToken = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
  public url: string;
  public identity;
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getUsers(): Observable<any> {
    return this._http.get(this.url + '/users', {
      headers: this.headers,
    });
  }

  getUsersById(id): Observable<any> {
    return this._http.get(this.url + '/userId/'+id, {
      headers: this.headers,
    });
  }

  udpateUser(id, datos): Observable<any> {
    let params = JSON.stringify(datos);
    return this._http.put(this.url + '/updateUser/'+id, params ,{
      headers: this.headers,
    });
  }

  register(user): Observable<any> {
    let params = JSON.stringify(user);

    return this._http.post(this.url + '/register', params, {
      headers: this.headers,
    });
  }

  login(user): Observable<any> {

    let params = JSON.stringify(user);
    console.log(params);

    return this._http.post(this.url + '/login', params, {
      headers: this.headers,
    });
  }

  getIdentity() {
    var identity2 = JSON.parse(localStorage.getItem('identity'));

    if (identity2 != null) {
      this.identity = identity2;
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  getToken() {
    var token2 = localStorage.getItem('token');

    if (token2 != null) {
      this.token = token2;
    } else {
      this.token = null;
    }

    return this.token;
  }
}
