import { Component, OnInit, ViewChild } from '@angular/core';
import { NameFilter } from '../../../filters';
import { User } from '../../../models/user.model';
import { VotoService } from '../../../services/votos.service';
import { UserService } from '../../../services/user.service';
import { ClrDatagrid } from '@clr/angular';
@Component({
  selector: 'app-papeleta1',
  templateUrl: './papeleta1.component.html',
  styleUrls: ['./papeleta1.component.scss'],
  providers: [UserService, VotoService],
})
export class Papeleta1Component implements OnInit {
  @ViewChild(ClrDatagrid) dg: ClrDatagrid;
  public variablesModals = {
    edit: false,
    delete: false,
  };
  indexPais: Number;
  cType = 'Honduras';
  rondaPais = '';
  paisTypeArray = [
    { pais: 'Honduras' }
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
    this.getVotos()
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
      this._votoService.getVotosAPresidente(this.token).subscribe((res) => {
        this.votos = res;

        resolve(res);
      });
    });
  }
  getVotos(){
    this.getPromise().then(()=>{
      this.filtrarXPuestoArray = this.votos.filter((elem) => {
        if(elem.datos.puestoCandidato === 'Presidente') return elem.datos.datosPais.nombrePais === 'Honduras';
      });
      let datosCandidatos = [];
      this.filtrarXPuestoArray.forEach((element) => {
        datosCandidatos.push(element.datos);
      });
      this.filtrarRondasArray = this.removeDuplicates(datosCandidatos, 'ronda');
    })
  }

  selectRonda(){
    this.ArrayFinal = this.filtrarXPuestoArray.filter((elem) => {
      return elem.datos.ronda == this.rondaPais;
    });
    setTimeout(() => this.dg.resize());
  }
}
