import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { VotoService } from '../../../services/votos.service';
@Component({
  selector: 'app-voto-secretario',
  templateUrl: './voto-secretario.component.html',
  styleUrls: ['./voto-secretario.component.scss'],
  providers: [UserService, VotoService],
})
export class VotoSecretarioComponent implements OnInit {
  public votoModel = {
    idCandidato: '',
    tipoVoto: '',
    puestoCandidato: 'Secretario',
    pais: '',
  };

  modalFinal = false;

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
      });
    });
  }

  addVoto() {
    this.addPromise().then((res) => {
      this.getVotosSecretario();
    });
  }

  cerrarSesion(){
    localStorage.clear()
    setTimeout(() => {
      this.modalFinal = false
      this._router.navigate(['']);
    }, 100);
  }

  getVotosSecretario() {
    this._votoService.getSecretario(this.token).subscribe(
      (res) => {
        if (res.candidatos) {
          this.candidatos = res.candidatos;
          this.filterXPaisPanama = this.candidatos.filter((elem) => {
            if (elem.datos.datosPais.nombrePais === 'Panama') {
              return elem.datos.datosPais.nombrePais === 'Panama';
            }
          });
          if (this.filterXPaisPanama.length > 0) {
            this.imagenTitulo = this.filterXPaisPanama[0].datos.datosPais.imagenPais;
            this.votoModel.pais = this.filterXPaisPanama[0].datos.datosPais.nombrePais;
          }

          if (this.filterXPaisPanama.length === 0) {
            this.filterXPaisNicaragua = this.candidatos.filter((elem) => {
              if (elem.datos.datosPais.nombrePais === 'Nicaragua') {
                return elem.datos.datosPais.nombrePais === 'Nicaragua';
              }
            });
            if (this.filterXPaisNicaragua.length > 0) {
              this.imagenTitulo = this.filterXPaisNicaragua[0].datos.datosPais.imagenPais;
              this.votoModel.pais = this.filterXPaisNicaragua[0].datos.datosPais.nombrePais;
            }
          }
          if (
            this.filterXPaisPanama.length === 0 &&
            this.filterXPaisNicaragua.length === 0
          ) {
            this.filterXPaisDominicana = this.candidatos.filter((elem) => {
              if (elem.datos.datosPais.nombrePais === 'Republica Dominicana') {
                return (
                  elem.datos.datosPais.nombrePais === 'Republica Dominicana'
                );
              }
            });

            if (this.filterXPaisDominicana.length > 0) {
              this.imagenTitulo = this.filterXPaisDominicana[0].datos.datosPais.imagenPais;
              this.votoModel.pais = this.filterXPaisDominicana[0].datos.datosPais.nombrePais;
            }
          }
          if (
            this.filterXPaisPanama.length === 0 &&
            this.filterXPaisNicaragua.length === 0 &&
            this.filterXPaisDominicana.length === 0
          ) {
            this.filterXPaisGuatemala = this.candidatos.filter((elem) => {
              if (elem.datos.datosPais.nombrePais === 'Guatemala') {
                return elem.datos.datosPais.nombrePais === 'Guatemala';
              }
            });
            if (this.filterXPaisGuatemala.length > 0) {
              this.imagenTitulo = this.filterXPaisGuatemala[0].datos.datosPais.imagenPais;
              this.votoModel.pais = this.filterXPaisGuatemala[0].datos.datosPais.nombrePais;
            }
          }
          if (
            this.filterXPaisPanama.length === 0 &&
            this.filterXPaisNicaragua.length === 0 &&
            this.filterXPaisDominicana.length === 0 &&
            this.filterXPaisGuatemala.length === 0
          ) {
            this.filterXPaisSalvador = this.candidatos.filter((elem) => {
              if (elem.datos.datosPais.nombrePais === 'El Salvador') {
                return elem.datos.datosPais.nombrePais === 'El Salvador';
              }
            });
            if (this.filterXPaisSalvador.length > 0) {
              this.imagenTitulo = this.filterXPaisSalvador[0].datos.datosPais.imagenPais;
              this.votoModel.pais = this.filterXPaisSalvador[0].datos.datosPais.nombrePais;
            }
          }
          if (
            this.filterXPaisPanama.length === 0 &&
            this.filterXPaisNicaragua.length === 0 &&
            this.filterXPaisDominicana.length === 0 &&
            this.filterXPaisGuatemala.length === 0 &&
            this.filterXPaisSalvador.length === 0
          ) {
            this.filterXPaisHonduras = this.candidatos.filter((elem) => {
              if (elem.datos.datosPais.nombrePais === 'Honduras') {
                return elem.datos.datosPais.nombrePais === 'Honduras';
              }
            });
            if (this.filterXPaisHonduras.length > 0) {
              this.imagenTitulo = this.filterXPaisHonduras[0].datos.datosPais.imagenPais;
              this.votoModel.pais = this.filterXPaisHonduras[0].datos.datosPais.nombrePais;
            }
          }
          if (
            this.filterXPaisPanama.length === 0 &&
            this.filterXPaisNicaragua.length === 0 &&
            this.filterXPaisDominicana.length === 0 &&
            this.filterXPaisGuatemala.length === 0 &&
            this.filterXPaisSalvador.length === 0 &&
            this.filterXPaisHonduras.length === 0
          ) {
            this.modalFinal = true;
          }
        }
      },
      (err) => {
        if (err.error && err.error.message === 'No hay candidatos a votar') {
          this.modalFinal = true;
        }
      }
    );
  }
}
