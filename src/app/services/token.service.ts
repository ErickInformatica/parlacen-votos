import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenService {
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  public url: string;
  public identity;
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getTokens(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/tokens', {
      headers: headersToken,
    });
  }

  getToken(token, id): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/tokenId/'+id, {
      headers: headersToken,
    });
  }

  addTokens(token,datos): Observable<any> {
    let params = JSON.stringify(datos)
    let headersToken = this.headers.set('Authorization', token)
    return this._http.post(this.url + '/addToken', params,{
      headers: headersToken,
    });
  }

  updateTokens(token,id ,datos): Observable<any> {
    let params = JSON.stringify(datos)
    let headersToken = this.headers.set('Authorization', token)
    return this._http.put(this.url + '/updateToken/'+ id, params,{
      headers: headersToken,
    });
  }

  deleteToken(token,id): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.delete(this.url + '/deleteToken/'+ id,{
      headers: headersToken,
    });
  }

  cerrarTokens(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/cerrarTokens', {
      headers: headersToken,
    });
  }

  pausarTokens(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/pausarTokens', {
      headers: headersToken,
    });
  }

  reanudarTokens(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/reanudarTokens', {
      headers: headersToken,
    });
  }
}
