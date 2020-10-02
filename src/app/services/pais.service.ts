import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';

@Injectable()
export class PaisService {
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  public url: string;
  public identity;
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getPaises(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/paises', {
      headers: headersToken,
    });
  }

  getPais(token, id): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/paisId/'+id, {
      headers: headersToken,
    });
  }


  addPais(token, datos): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    let params = JSON.stringify(datos)
    return this._http.post(this.url + '/addPais', params ,{
      headers: headersToken,
    });
  }

  updatePais(token, id ,datos): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    let params = JSON.stringify(datos)
    return this._http.put(this.url + '/updatePais/' + id, params ,{
      headers: headersToken,
    });
  }

  deletePais(token, id): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.delete(this.url + '/deletePais/' + id ,{
      headers: headersToken,
    });
  }
}
