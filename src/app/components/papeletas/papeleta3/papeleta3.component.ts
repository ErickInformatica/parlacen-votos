import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../models/user.model';
import { VotoService } from '../../../services/votos.service';
import { UserService } from '../../../services/user.service';
import { ClrDatagrid } from '@clr/angular';

@Component({
  selector: 'app-papeleta3',
  templateUrl: './papeleta3.component.html',
  styleUrls: ['./papeleta3.component.scss'],
  providers: [UserService, VotoService],
})
export class Papeleta3Component implements OnInit {
  @ViewChild(ClrDatagrid) dg: ClrDatagrid;
  public variablesModals = {
    edit: false,
    delete: false
  }
  indexPais: Number;
  cType = '';
  rondaPais = '';
  paisTypeArray = [
    { pais: 'Guatemala' },
    { pais: 'Honduras' },
    { pais: 'El Salvador' },
    { pais: 'Nicaragua' },
    { pais: 'Panama' },
    { pais: 'Republica Dominicana' },
  ];
  public filtrarRondasArray = [];
  public filtrarXPuestoArray = [];
  public ArrayFinal = [];
  public token;
  public votos;
  constructor(
    private _votoService: VotoService,
    private _userService: UserService
  )
  {
    this.token = this._userService.getToken();
  }


  ngOnInit(): void {
    this.getPromise()
  }

  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  getPromise(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._votoService.getVotosASecretario(this.token).subscribe((res) => {
        this.votos = res;

        resolve(res);
      });
    });
  }
  rondasXPais() {
    this.rondaPais = ''
    this.filtrarXPuestoArray = this.votos.filter((elem) => {
      if(elem.datos.puestoCandidato === 'Secretario') return elem.datos.datosPais.nombrePais === this.cType;
    });
    let datosCandidatos = [];
    this.filtrarXPuestoArray.forEach((element) => {
      datosCandidatos.push(element.datos);
    });
    this.filtrarRondasArray = this.removeDuplicates(datosCandidatos, 'ronda');
  }

  selectRonda(){
    this.ArrayFinal = this.filtrarXPuestoArray.filter((elem) => {
      return elem.datos.ronda == this.rondaPais;
    });
    setTimeout(() => this.dg.resize());
  }


}
