import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';
import { VotoService } from '../../../services/votos.service';

@Component({
  selector: 'app-voto-vice-presidente',
  templateUrl: './voto-vice-presidente.component.html',
  styleUrls: ['./voto-vice-presidente.component.scss'],
  providers: [UserService, VotoService]
})
export class VotoVicePresidenteComponent implements OnInit {
  public votoModel = {
    idCandidato: '',
    tipoVoto: '',
    puestoCandidato: 'Vicepresidente',
    pais: ''
  }

  public imagenTitulo;
  public filterXPaisPanama = []
  public filterXPaisNicaragua = []
  public filterXPaisSalvador = []
  public filterXPaisDominicana = []
  public filterXPaisGuatemala = []
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
        icon: 'error',
        title: 'Debe seleccionar algo a votar, no puede ir vacio',
        showConfirmButton: false,
        timer: 2000
      })
    }
    this.addPromise().then(res=>{
      this.getVotosPresidente()
    })
  }

  getVotosPresidente(){
    this._votoService.getVicePrecidenteAVotar(this.token).subscribe(
      res=>{

        if(res.candidatos){
          this.candidatos = res.candidatos
          this.filterXPaisPanama = this.candidatos.filter((elem) => {
            if(elem.datos.datosPais.nombrePais === 'Panama'){
              return elem.datos.datosPais.nombrePais === 'Panama'
            }
          });
         if(this.filterXPaisPanama.length > 0) {
          this.imagenTitulo = this.filterXPaisPanama[0].datos.datosPais.imagenPais
          this.votoModel.pais = this.filterXPaisPanama[0].datos.datosPais.nombrePais
         }

          if(this.filterXPaisPanama.length === 0){
            this.filterXPaisNicaragua = this.candidatos.filter((elem)=>{
              if(elem.datos.datosPais.nombrePais === 'Nicaragua'){
                return elem.datos.datosPais.nombrePais === 'Nicaragua'
              }
            })
            if(this.filterXPaisNicaragua.length > 0) {
            this.imagenTitulo = this.filterXPaisNicaragua[0].datos.datosPais.imagenPais
            this.votoModel.pais = this.filterXPaisNicaragua[0].datos.datosPais.nombrePais
            }
          }
          if(this.filterXPaisPanama.length === 0 && this.filterXPaisNicaragua.length === 0){
            this.filterXPaisDominicana = this.candidatos.filter((elem)=>{
              if(elem.datos.datosPais.nombrePais === 'Republica Dominicana'){
                return elem.datos.datosPais.nombrePais === 'Republica Dominicana'
              }
            })

            if(this.filterXPaisDominicana.length > 0) {
              this.imagenTitulo = this.filterXPaisDominicana[0].datos.datosPais.imagenPais
              this.votoModel.pais = this.filterXPaisDominicana[0].datos.datosPais.nombrePais
              }
          }
          if(this.filterXPaisPanama.length === 0 && this.filterXPaisNicaragua.length === 0 && this.filterXPaisDominicana.length === 0){
            this.filterXPaisGuatemala = this.candidatos.filter((elem)=>{
              if(elem.datos.datosPais.nombrePais === 'Guatemala'){
                return elem.datos.datosPais.nombrePais === 'Guatemala'
              }
            })
            if(this.filterXPaisGuatemala.length > 0) {
              this.imagenTitulo = this.filterXPaisGuatemala[0].datos.datosPais.imagenPais
              this.votoModel.pais = this.filterXPaisGuatemala[0].datos.datosPais.nombrePais
              }
          }
          if(this.filterXPaisPanama.length === 0 && this.filterXPaisNicaragua.length === 0 && this.filterXPaisDominicana.length === 0 && this.filterXPaisGuatemala.length === 0){
            this.filterXPaisSalvador = this.candidatos.filter((elem)=>{
              if(elem.datos.datosPais.nombrePais === 'El Salvador'){
                return elem.datos.datosPais.nombrePais === 'El Salvador'
              }
            })
            if(this.filterXPaisSalvador.length > 0) {
              this.imagenTitulo = this.filterXPaisSalvador[0].datos.datosPais.imagenPais
              this.votoModel.pais = this.filterXPaisSalvador[0].datos.datosPais.nombrePais

              }
          }
          //  if(this.filterXPaisPanama.length === 0 && this.filterXPaisNicaragua.length === 0 && this.filterXPaisDominicana.length === 0 && this.filterXPaisGuatemala.length === 0 && this.filterXPaisSalvador.length === 0){
          //   this._router.navigate(['/user/votoS/Secretaria/1ra'])
          // }
        }
      }, err=>{
        console.log(err);

        if(err.error.message === "No hay candidatos a votar" || err.error.message === "No hay candidatos ha votar"){
          this._router.navigate(['/user/votoS/Secretaria/1ra'])
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
