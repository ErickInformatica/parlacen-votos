import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-papeleta2',
  templateUrl: './papeleta2.component.html',
  styleUrls: ['./papeleta2.component.scss']
})
export class Papeleta2Component implements OnInit {
  public variablesModals = {
    edit: false,
    delete: false
  }
  indexPais: Number;
  cType = '';
  rondaPais = '';
  paisTypeArray = [
    { pais: 'Guatemala', rondas: [
      {ronda: 'Ronda 1'},
      {ronda: 'Ronda 2'},
      {ronda: 'Nueva Votacion Ronda 1'}
    ]},
    { pais: 'El Salvador', rondas: [
      {ronda: 'Ronda 1'},
    ] },
    { pais: 'Nicaragua', rondas: [
      {ronda: 'Ronda 1'},
      {ronda: 'Ronda 2'}
    ] },
    { pais: 'Panama', rondas: [
      {ronda: 'Ronda 1'}
    ] },
    { pais: 'Republica Dominicana', rondas: [
      {ronda: 'Ronda 1'},
      {ronda: 'Ronda 2'},
      {ronda: 'Nueva Votacion Ronda 1'}
    ] }
  ]

  public users: User[]
  constructor() { }

  ngOnInit(): void {
  }
  changePais(evt){

  }

  resetData(ev){

    this.users = []
  }


}
