import { Component, OnInit, ViewChild } from '@angular/core';
import { ClrDatagrid } from '@clr/angular';
import { User } from '../../../models/user.model';
import { VotoService } from '../../../services/votos.service';
import { UserService } from '../../../services/user.service';
import { ExcelService } from '../../../services/exporEXL.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-papeleta2',
  templateUrl: './papeleta2.component.html',
  styleUrls: ['./papeleta2.component.scss'],
  providers: [UserService, VotoService,ExcelService],
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

  public tokenSel = ''
  public filtrarTokensArray = []
  public filtrarRondasArray = [];
  public filtrarXPuestoArray = [];
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
    this.getPromise()
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
    if(this.ArrayFinal.length > 0){

      this.excelService.exportAsExcelFile(this.ArrayFinal, 'sec');
    }
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Debe seleccionar un país y luego una vuelta para generar el Excel',
      showConfirmButton: false,
      timer: 1500,
    });
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
    this.tokenSel =''
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
