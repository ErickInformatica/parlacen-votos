import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.scss']
})
export class CandidatosComponent implements OnInit {
  public variablesModals = {
    edit: false,
    delete: false
  }
  indexPais: Number;
  cType = '';
  rondaPais = '';

  paisTypeArray = [
    { pais: 'Guatemala' },
    { pais: 'El Salvador'},
    { pais: 'Nicaragua'},
    { pais: 'Panama'},
    { pais: 'Republica Dominicana'}
  ]

  tiposRondas =[
    { nombre: 'Ronda 1'},
    { nombre: 'Ronda 2'},
    { nombre: 'Nuevo Votacion Ronda 1'},
    { nombre: 'Nuevo Votacion Ronda 2'},
    { nombre: 'Ganador'}
  ]

  public users

  puestosArray = [
    { puesto: 'Presidente' },
    { puesto: 'Vicepresidente' },
    { puesto: 'Secretario' },
  ]


  constructor() { }

  ngOnInit(): void {
  }

  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}

  changePais(evt){

  }

  resetData(ev){

2
  }

}
