import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class LoginRolsGuard implements CanActivate {
  public identity;
  constructor(private _router: Router) {}

  canActivate() {
    let identity2 = this.getIdentity();
    if (identity2 && identity2.datos.rol === 'SA') {
      this._router.navigate(['/home']);
      return false;
    }

    if (identity2 && identity2.datos.rol === 'ADMIN') {
      this._router.navigate(['/admin']);
      return false;
    }

    if (identity2 && identity2.datos.rol === 'USER') {
      this._router.navigate(['/user']);
      return false;
    }

    return true
  }

  getIdentity() {
    var identity = JSON.parse(sessionStorage.getItem('identity'));

    if (identity != 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }
}
