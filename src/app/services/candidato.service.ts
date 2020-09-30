import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';

@Injectable()
export class CandidatoService {
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  public url: string;
  public identity;
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getCandidatos(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/candidatos', {
      headers: headersToken,
    });
  }

  addCandidatos(token, datos): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    let params = JSON.stringify(datos)
    return this._http.post(this.url + '/addCandidato', params ,{
      headers: headersToken,
    });
  }
}
