import { Component, OnInit, ViewChild } from '@angular/core';
import { ClrDatagrid } from '@clr/angular';
import { User } from '../../../models/user.model';
import { VotoService } from '../../../services/votos.service';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-papeleta2',
  templateUrl: './papeleta2.component.html',
  styleUrls: ['./papeleta2.component.scss'],
  providers: [UserService, VotoService],
})
export class Papeleta2Component implements OnInit {
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
      this._votoService.getVotosAVicepresidente(this.token).subscribe((res) => {
        this.votos = res;

        resolve(res);
      });
    });
  }
  rondasXPais() {
    this.rondaPais = ''
    this.filtrarXPuestoArray = this.votos.filter((elem) => {
      if(elem.datos.puestoCandidato === 'Vicepresidente') return elem.datos.datosPais.nombrePais === this.cType;
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
