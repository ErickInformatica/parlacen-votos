import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';
import { VotoService } from '../../../services/votos.service';

@Component({
  selector: 'app-voto-presidente',
  templateUrl: './voto-presidente.component.html',
  styleUrls: ['./voto-presidente.component.scss'],
  providers: [UserService, VotoService]
})
export class VotoPresidenteComponent implements OnInit {
  public votoModel = {
    idCandidato: '',
    tipoVoto: '',
    puestoCandidato: 'Presidente',
    pais: ''
  }
  public nombrePais;
  public imagenTitulo;
  public filterXPaisHonduras = []
  public token
  public candidatos
  public selectedPresidente = '';
  constructor(private _votoService: VotoService,
    private _userService: UserService,
    private _router: Router) {
      this.token = this._userService.getToken()
    }

  ngOnInit(): void {
    this.getVotosPresidente()
  }
  getSelected(ev, datos){
    this.votoModel.tipoVoto = ''
  }

  getSelectedNoW(ev){
    this.votoModel.idCandidato = ''
  }

  addPromise(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._votoService.addVoto(this.token, this.votoModel).subscribe((res) => {
        resolve(res);
      }, err=>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 2000
        })
      });
    });
  }

  addVoto(){
    if(this.votoModel.idCandidato === '' && this.votoModel.tipoVoto === ''){
      return Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Debe seleccionar una opción de voto',
        showConfirmButton: false,
        timer: 2000
      })
    }
    this.addPromise().then(res=>{
      this.getVotosPresidente()
    })
  }

  getVotosPresidente(){
    this._votoService.getPrecidenteAVotar(this.token).subscribe(
      res=>{
        if(res.candidatos){
          this.candidatos = res.candidatos
          this.filterXPaisHonduras = this.candidatos.filter((elem) => {
            if(elem.datos.datosPais.nombrePais === 'Honduras'){
              return elem.datos.datosPais.nombrePais === 'Honduras'
            }
          });
         if(this.filterXPaisHonduras.length > 0) {
          this.imagenTitulo = this.filterXPaisHonduras[0].datos.datosPais.imagenPais
          this.votoModel.pais = this.filterXPaisHonduras[0].datos.datosPais.nombrePais
          this.nombrePais = this.filterXPaisHonduras[0].datos.datosPais.nombrePais
         }
           if(this.filterXPaisHonduras.length === 0 ){
            this._router.navigate(['/user/votoV/Vicepresidente/1ra'])
          }
        }
      }, err=>{
        if(err.error.message === "No hay candidatos a votar" || err.error.message === "No hay candidatos ha votar"){
          this._router.navigate(['/user/votoV/Vicepresidente/1ra'])
        }else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.error.message,
            showConfirmButton: false,
            timer: 2000
          })
        }
      }
    )
  }
}
