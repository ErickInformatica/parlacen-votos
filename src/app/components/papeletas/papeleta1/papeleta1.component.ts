import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NameFilter } from '../../../filters';
import { User } from '../../../models/user.model';
import { VotoService } from '../../../services/votos.service';
import { UserService } from '../../../services/user.service';
import { ClrDatagrid } from '@clr/angular';
import { ExcelService } from '../../../services/exporEXL.service';
@Component({
  selector: 'app-papeleta1',
  templateUrl: './papeleta1.component.html',
  styleUrls: ['./papeleta1.component.scss'],
  providers: [UserService, VotoService, ExcelService],
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

  public tokenSel = ''

  public filtrarRondasArray = [];
  public filtrarXPuestoArray = [];
  public filtrarTokensArray = []
  public ArrayFinal = [];
  public token;
  public votos;
  public excelVotos
  constructor(
    private _votoService: VotoService,
    private _userService: UserService,
    private excelService:ExcelService
  )
  {
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getVotos()
  }

  allVotos(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._votoService.getVotos(this.token).subscribe((res) => {
        this.excelVotos = res.datos;

        resolve(res);
      });
    });
  }

  exportGeneral(){
    this.allVotos().then(()=>{
      this.excelService.exportAsExcelFile(this.excelVotos,'general')
    })
  }


  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.ArrayFinal, 'sample');
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
        console.log(res);

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
    this.tokenSel =''
    let datosCandidatos = [];

      this.filtrarXPuestoArray.forEach((element) => {
        datosCandidatos.push(element.datos);
      });
      datosCandidatos = datosCandidatos.filter((elem) => {
        return elem.ronda == this.rondaPais;
      });

      console.log(datosCandidatos);

    this.filtrarTokensArray = this.removeDuplicates(datosCandidatos, 'datosToken.token');


  }

  selectToken(){
    this.ArrayFinal = this.filtrarXPuestoArray.filter((elem) => {
      return elem.datos.datosToken.token == this.tokenSel;
    });
    setTimeout(() => this.dg.resize());
  }
}
