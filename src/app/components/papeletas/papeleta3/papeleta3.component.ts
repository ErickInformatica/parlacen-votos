import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-papeleta3',
  templateUrl: './papeleta3.component.html',
  styleUrls: ['./papeleta3.component.scss']
})
export class Papeleta3Component implements OnInit {

  public variablesModals = {
    edit: false,
    delete: false
  }
  indexPais: Number;
  cType = '';
  rondaPais = '';
  paisTypeArray= [
    { pais: 'Guatemala', rondas: [
      {ronda: 'Ronda 1'},
      {ronda: 'Ronda 2'},
      {ronda: 'Nueva Votacion Ronda 1'}
    ]},
    { pais: 'Honduras', rondas: [
      {ronda: 'Ronda 1'}
    ] },
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
