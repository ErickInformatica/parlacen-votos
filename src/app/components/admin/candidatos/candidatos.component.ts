import { Component, OnInit } from '@angular/core';
import { CandidatoService } from '../../../services/candidato.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.scss'],
  providers: [UserService, CandidatoService]
})
export class CandidatosComponent implements OnInit {
  public variablesModals = {
    edit: false,
    delete: false,
    add: false
  }
  public token;
  public candidatos;

  indexPais: Number;
  cType = '';
  rondaPais = '';

  paisTypeArray = [
    { pais: 'Guatemala' },
    { pais: 'Honduras' },
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

  puestos = [
    {puesto: 'Presidente'},
    {puesto: 'Vicepresidente'},
    {puesto: 'Secretario'}
  ]

  public newCandidato = {
    nombres: '',
    apellidos: '',
    email: '',
    vancada: '',
    image: '',
    ronda: '',
    pais: '',
    puestoPostulado: ''
  }


  public filtrarRondasArray = []
  public filtrarXPuestoArray = []
  public ArrayFinal = []

  constructor(private _candidatoService: CandidatoService,private _userService: UserService) {
    this.token = this._userService.getToken()
  }

  ngOnInit(): void {
    this.getCandidatos()
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

  getCandidatos(){
    this._candidatoService.getCandidatos(this.token).subscribe(
      res => {
        this.candidatos = res.datos
      }
    )
  }

  addCandidato(){
    this._candidatoService.addCandidatos(this.token, this.newCandidato).subscribe(
      res => {
        this.getCandidatos()
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Candidato añadido con exito',
          showConfirmButton: false,
          timer: 1500
        })
      }, err =>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 2000
        })
      }
    )
  }

  changePais(evt){
    this.ArrayFinal = this.candidatos.filter(elem =>{
      return elem.datos.ronda == this.rondaPais
    })
    console.log(this.ArrayFinal);

  }

  resetData(ev){
    this.filtrarXPuestoArray = this.candidatos.filter(elem =>{
      return elem.datos.puestoPostulado == this.cType
    })
    let datosCandidatos = []
        this.filtrarXPuestoArray.forEach(element => {
          datosCandidatos.push(element.datos)
        });
    this.filtrarRondasArray = this.removeDuplicates(datosCandidatos, "ronda")

  }

}
