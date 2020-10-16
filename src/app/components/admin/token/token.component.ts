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
    ronda: 'Vuelta 1'
  }
  public tokensData;
  public getUpdateToken;
  public token;

  tiposRondas =[
    { nombre: 'Vuelta 1' },
    { nombre: 'Vuelta 2' },
    { nombre: 'Nuevo Votacion Vuelta 1' },
    { nombre: 'Nuevo Votacion Vuelta 2' },
    { nombre: 'Segunda Votacion Vuelta 1' },
    { nombre: 'Segunda Votacion Vuelta 2' },
    { nombre: 'Ganador' },
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
          timer: 2000
        })
      }
    )
  }

  getToken(id){
    this._tokenService.getToken(this.token, id).subscribe(
      res=>{
        this.getUpdateToken = res;
      }
    )
  }


  updateToken(id){
    this._tokenService.updateTokens(this.token, id, this.getUpdateToken.datos).subscribe(
      res => {
        this.getTokens()
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Token actualizado con exito',
          showConfirmButton: false,
          timer: 1500
        })
      }, err =>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 2000
        })
      }
    )
  }

  deleteToken(id){
    this._tokenService.deleteToken(this.token, id).subscribe(
      res => {
        this.getTokens()
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Token eliminado con exito',
          showConfirmButton: false,
          timer: 1500
        })
      }, err =>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 2000
        })
      }
    )
  }

  cerrarTokens(){
    this._tokenService.cerrarTokens(this.token).subscribe(
      res => {
        this.getTokens()
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tokens Cerrados con Exito',
          showConfirmButton: false,
          timer: 1500
        })
      },
      err =>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 2000
        })
      }
    )
  }

  pausarTokens(){
    this._tokenService.pausarTokens(this.token).subscribe(
      res => {
        this.getTokens()
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Votaciones pausadas con Exito',
          showConfirmButton: false,
          timer: 1500
        })
      },
      err =>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 2000
        })
      }
    )
  }

  reanudarTokens(){
    this._tokenService.reanudarTokens(this.token).subscribe(
      res => {
        this.getTokens()
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Votaciones reanudadas con Exito',
          showConfirmButton: false,
          timer: 1500
        })
      },
      err =>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 2000
        })
      }
    )
  }

}
