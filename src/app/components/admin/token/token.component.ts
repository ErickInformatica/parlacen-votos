import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { TokenService } from '../../../services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss'],
  providers: [TokenService, UserService]
})
export class TokenComponent implements OnInit {

  public variablesModals = {
    edit: false,
    delete: false,
    add: false
  }
  public addToken={
    numeroToken: '',
    vecesUso: '',
    ronda: 'Ronda 1'
  }
  public tokensData;
  public getUpdateUser;
  public token;

  tiposRondas =[
    { nombre: 'Ronda 1'},
    { nombre: 'Ronda 2'},
    { nombre: 'Nuevo Votacion Ronda 1'},
    { nombre: 'Nuevo Votacion Ronda 2'}
  ]

  constructor(private _tokenService: TokenService,private _userService: UserService) {
    this.token = this._userService.getToken()
  }

  ngOnInit(): void {
    this.getTokens()

  }

  getTokens(){
    this._tokenService.getTokens(this.token).subscribe(
      res=>{
        this.tokensData = res.datos;
      }
    )
  }

  newToken(){
    this._tokenService.addTokens(this.token, this.addToken).subscribe(
      res=>{
        this.getTokens()
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Token añadido con exito',
          showConfirmButton: false,
          timer: 1500
        })
      }, err =>{

        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

}
