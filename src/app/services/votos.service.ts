import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';

@Injectable()
export class VotoService {
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  public url: string;
  public identity;
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getPrecidenteAVotar(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/candidatosPresidente', {
      headers: headersToken,
    });
  }

  getVicePrecidenteAVotar(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/candidatosVicepresidente', {
      headers: headersToken,
    });
  }

  getSecretario(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/candidatosSecretario', {
      headers: headersToken,
    });
  }


  getVotosASecretario(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/votosSecretario', {
      headers: headersToken,
    });
  }


  getVotosAPresidente(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/votosPresidente', {
      headers: headersToken,
    });
  }

  getVotosAVicepresidente(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/votosVicepresidente', {
      headers: headersToken,
    });
  }

  getContosXVicepresidente(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/conteosXVicepresidente', {
      headers: headersToken,
    });
  }

  getContosXPresidente(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/conteosXPresidente', {
      headers: headersToken,
    });
  }

  getContosXSecretario(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/conteosXSecretario', {
      headers: headersToken,
    });
  }

  getVotos(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/votos', {
      headers: headersToken,
    });
  }

  addVoto(token, datos): Observable<any> {
    let params = JSON.stringify(datos)
    let headersToken = this.headers.set('Authorization', token)
    return this._http.post(this.url + '/addVoto',params ,{
      headers: headersToken,
    });
  }


}
