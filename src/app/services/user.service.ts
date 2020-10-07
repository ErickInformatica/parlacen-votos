import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  public url: string;
  public identity;
  public identityUser;
  public identityAdmin;
  public identitySA;
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getUsers(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/users', {
      headers: headersToken,
    });
  }

  getUsersById(token,id): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/userId/'+id, {
      headers: headersToken,
    });
  }

  udpateUser(token,id, datos): Observable<any> {
    let params = JSON.stringify(datos);
    let headersToken = this.headers.set('Authorization', token)
    return this._http.put(this.url + '/updateUser/'+id, params ,{
      headers: headersToken,
    });
  }

  changePasswordAdmin(token, id, datos): Observable<any> {
    let params = JSON.stringify(datos);
    let headersToken = this.headers.set('Authorization', token)
    return this._http.put(this.url + '/changePassword/'+id, params ,{
      headers: headersToken,
    });
  }

  changePasswordUser(token, datos): Observable<any> {
    let params = JSON.stringify(datos);
    let headersToken = this.headers.set('Authorization', token)
    return this._http.put(this.url + '/changePasswordUser', params ,{
      headers: headersToken,
    });
  }

  registerAdmin(token,user): Observable<any> {
    let params = JSON.stringify(user);
    let headersToken = this.headers.set('Authorization', token)
    return this._http.post(this.url + '/registerActivo', params, {
      headers: headersToken,
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
  getUserIdentity() {
    var identity2 = JSON.parse(localStorage.getItem('identity'));

    if (identity2 != null) {
      this.identityUser = identity2;
    } else {
      this.identityUser = null;
    }

    return this.identityUser;
  }

  getAdminIdentity() {
    var identity2 = JSON.parse(localStorage.getItem('identity'));

    if (identity2 != null) {
      this.identityAdmin = identity2;
    } else {
      this.identityAdmin = null;
    }

    return this.identityAdmin;
  }

  getSAIdentity() {
    var identity2 = JSON.parse(localStorage.getItem('identity'));

    if (identity2 != null) {
      this.identitySA = identity2;
    } else {
      this.identitySA = null;
    }

    return this.identitySA;
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
