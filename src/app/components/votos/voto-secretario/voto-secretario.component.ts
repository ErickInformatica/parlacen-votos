import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';
import { VotoService } from '../../../services/votos.service';
import { ClrLoadingState } from '@clr/angular';
@Component({
  selector: 'app-voto-secretario',
  templateUrl: './voto-secretario.component.html',
  styleUrls: ['./voto-secretario.component.scss'],
  providers: [UserService, VotoService],
})
export class VotoSecretarioComponent implements OnInit {
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  public votoModel = {
    idCandidato: '',
    tipoVoto: '',
    puestoCandidato: 'Secretario',
    pais: '',
  };

  modalFinal = false;
  public nombrePais;
  public imagenTitulo;
  public filterXPaisPanama = [];
  public filterXPaisNicaragua = [];
  public filterXPaisSalvador = [];
  public filterXPaisDominicana = [];
  public filterXPaisGuatemala = [];
  public filterXPaisHonduras = [];
  public token;
  public candidatos;
  public selectedPresidente = '';
  constructor(
    private _votoService: VotoService,
    private _userService: UserService,
    private _router: Router
  ) {
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getVotosSecretario();
  }
  getSelected(ev, datos) {
    this.votoModel.tipoVoto = '';;
  }

  getSelectedNoW(ev) {
    this.votoModel.idCandidato = '';
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
        this.validateBtnState = ClrLoadingState.SUCCESS;
      });
    });
  }

  addVoto() {
    this.validateBtnState = ClrLoadingState.LOADING;
    if(this.votoModel.idCandidato === '' && this.votoModel.tipoVoto === ''){
      this.validateBtnState = ClrLoadingState.SUCCESS;
      return Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Debe seleccionar una opción de voto',
        showConfirmButton: false,
        timer: 2000
      })
    }
    this.addPromise().then((res) => {
      this.validateBtnState = ClrLoadingState.SUCCESS;
      this.getVotosSecretario();
      this.votoModel.tipoVoto = ''
      this.votoModel.idCandidato = ''
    });
  }

  cerrarSesion(){
    sessionStorage.clear()
    setTimeout(() => {
      this.modalFinal = false
      this._router.navigate(['']);
    }, 100);
  }

  getVotosSecretario() {
    this._votoService.getSecretario(this.token).subscribe(
      (res) => {if (res.candidatos) {
        this.candidatos = res.candidatos;
        this.filterXPaisSalvador = this.candidatos.filter((elem) => {
          if (elem.datos.datosPais.nombrePais === 'El Salvador') {
            return elem.datos.datosPais.nombrePais === 'El Salvador';
          }
        });
        if (this.filterXPaisSalvador.length > 0) {
          this.imagenTitulo = this.filterXPaisSalvador[0].datos.datosPais.imagenPais;
          this.votoModel.pais = this.filterXPaisSalvador[0].datos.datosPais.nombrePais;
          this.nombrePais = this.filterXPaisSalvador[0].datos.datosPais.nombrePais;
        }


        if(this.filterXPaisSalvador.length === 0){

          this.filterXPaisGuatemala = this.candidatos.filter((elem) => {
            if (elem.datos.datosPais.nombrePais === 'Guatemala') {
              return elem.datos.datosPais.nombrePais === 'Guatemala';
            }
          });
          if (this.filterXPaisGuatemala.length > 0) {
            this.filterXPaisGuatemala.sort((a, b) => (a.datos.orden > b.datos.orden) ? 1 : -1)
            this.imagenTitulo = this.filterXPaisGuatemala[0].datos.datosPais.imagenPais;
            this.nombrePais = this.filterXPaisGuatemala[0].datos.datosPais.nombrePais;
            this.votoModel.pais = this.filterXPaisGuatemala[0].datos.datosPais.nombrePais;
          }
        }


        if (this.filterXPaisGuatemala.length === 0 && this.filterXPaisSalvador.length === 0) {
          this.filterXPaisHonduras = this.candidatos.filter((elem) => {
            if (elem.datos.datosPais.nombrePais === 'Honduras') {
              return elem.datos.datosPais.nombrePais === 'Honduras';
            }
          });
          if (this.filterXPaisHonduras.length > 0) {
            this.filterXPaisHonduras.sort((a, b) => (a.datos.orden > b.datos.orden) ? 1 : -1)
            this.imagenTitulo = this.filterXPaisHonduras[0].datos.datosPais.imagenPais;
            this.votoModel.pais = this.filterXPaisHonduras[0].datos.datosPais.nombrePais;
            this.nombrePais = this.filterXPaisHonduras[0].datos.datosPais.nombrePais;
          }
        }
        if (
          this.filterXPaisHonduras.length === 0 &&
          this.filterXPaisSalvador.length === 0 &&
          this.filterXPaisGuatemala.length === 0
        ) {

          this.filterXPaisNicaragua = this.candidatos.filter((elem) => {
            if (elem.datos.datosPais.nombrePais === 'Nicaragua') {
              return elem.datos.datosPais.nombrePais === 'Nicaragua';
            }
          });
          if (this.filterXPaisNicaragua.length > 0) {
            this.filterXPaisNicaragua.sort((a, b) => (a.datos.orden > b.datos.orden) ? 1 : -1)
            this.imagenTitulo = this.filterXPaisNicaragua[0].datos.datosPais.imagenPais;
            this.nombrePais = this.filterXPaisNicaragua[0].datos.datosPais.nombrePais;
            this.votoModel.pais = this.filterXPaisNicaragua[0].datos.datosPais.nombrePais;
          }
        }
        if (
          this.filterXPaisHonduras.length === 0 &&
          this.filterXPaisSalvador.length === 0 &&
          this.filterXPaisGuatemala.length === 0 &&
          this.filterXPaisNicaragua.length === 0
        ) {
          this.filterXPaisPanama = this.candidatos.filter((elem) => {
            if (elem.datos.datosPais.nombrePais === 'Panamá') {
              return elem.datos.datosPais.nombrePais === 'Panamá';
            }
          });

          if (this.filterXPaisPanama.length > 0) {
            this.filterXPaisPanama.sort((a, b) => (a.datos.orden > b.datos.orden) ? 1 : -1)
            this.imagenTitulo = this.filterXPaisPanama[0].datos.datosPais.imagenPais;
            this.nombrePais = this.filterXPaisPanama[0].datos.datosPais.nombrePais;
            this.votoModel.pais = this.filterXPaisPanama[0].datos.datosPais.nombrePais;
          }
        }
        if (
          this.filterXPaisHonduras.length === 0 &&
          this.filterXPaisSalvador.length === 0 &&
          this.filterXPaisGuatemala.length === 0 &&
          this.filterXPaisNicaragua.length === 0 &&
          this.filterXPaisPanama.length === 0
        ) {

          this.filterXPaisDominicana = this.candidatos.filter((elem) => {
            if (elem.datos.datosPais.nombrePais === 'República Dominicana') {
              return (
                elem.datos.datosPais.nombrePais === 'República Dominicana'
              );
            }
          });

          if (this.filterXPaisDominicana.length > 0) {
            this.filterXPaisDominicana.sort((a, b) => (a.datos.orden > b.datos.orden) ? 1 : -1)
            this.imagenTitulo = this.filterXPaisDominicana[0].datos.datosPais.imagenPais;
            this.nombrePais = this.filterXPaisDominicana[0].datos.datosPais.nombrePais;
            this.votoModel.pais = this.filterXPaisDominicana[0].datos.datosPais.nombrePais;
          }
        }
        //  if(this.filterXPaisPanama.length === 0 && this.filterXPaisNicaragua.length === 0 && this.filterXPaisDominicana.length === 0 && this.filterXPaisGuatemala.length === 0 && this.filterXPaisSalvador.length === 0){
        //   this._router.navigate(['/user/votoS/Secretaria/1ra'])
        // }
      }
      },
      (err) => {
        if(err.error.message === "No hay candidatos a votar" || err.error.message === "No hay candidatos ha votar"){
          this.modalFinal = true;
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
    );
  }
}
