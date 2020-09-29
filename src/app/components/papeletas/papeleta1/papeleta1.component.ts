import { Component, OnInit } from '@angular/core';
import { NameFilter } from '../../../filters';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-papeleta1',
  templateUrl: './papeleta1.component.html',
  styleUrls: ['./papeleta1.component.scss']
})
export class Papeleta1Component implements OnInit {
  public variablesModals = {
    edit: false,
    delete: false
  }
  indexPais: Number;
  cType = 0;
  rondaPais = '';
  paisTypeArray = [
    { pais: 'Guatemala', rondas: [
      {ronda: 'Ronda 1'},
      {ronda: 'Ronda 2'},
      {ronda: 'Nueva Votacion Ronda 1'}
    ]}
  ];

  public users: User[]
  constructor() {
  }

  ngOnInit(): void {
  }

  changePais(evt){

    console.log(this.rondaPais);

  }

  resetData(ev){

    this.users = []
  }

}
