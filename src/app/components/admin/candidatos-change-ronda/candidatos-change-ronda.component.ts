import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidatos-change-ronda',
  templateUrl: './candidatos-change-ronda.component.html',
  styleUrls: ['./candidatos-change-ronda.component.scss']
})
export class CandidatosChangeRondaComponent implements OnInit {
  public variablesModals = {
    edit: false,
    delete: false
  }
  votosPruebas = [
    {
      nombre: "Juanito",
      texto: "esto es una prueba"
    },
    {
      nombre: "Pedriot",
      texto: "esto es una prueba2"
    },
    {
      nombre: "Cesar",
      texto: "esto es una prueba3"
    },
    {
      nombre: "luisito",
      texto: "esto es una prueba4"
    },
    {
      nombre: "Vini",
      texto: "esto es una prueba5"
    }
  ]

  candidatos = [
    {
      nombre: "Juanito Guatemala",
      texto: "esto es una prueba",
      pais: 'Guatemala',
      ronda: 'Ronda 1'
    },
    {
      nombre: "Pedriot Guatemala",
      texto: "esto es una prueba2",
      pais: 'Guatemala',
      ronda: 'Ronda 1'
    },
    {
      nombre: "Cesar Guatemala",
      texto: "esto es una prueba3",
      pais: 'Guatemala',
      ronda: 'Ronda 2'
    },
    {
      nombre: "luisito Nicaragua",
      texto: "esto es una prueba4",
      pais: 'Nicaragua',
      ronda: 'Ronda 2'
    },
    {
      nombre: "Vini Nicaragua",
      texto: "esto es una prueba5",
      pais: 'Nicaragua',
      ronda: 'Ronda 2'
    }
  ]

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


  public filterPais = []
  public rondaSelectedChange = 'Ronda 1'

  public filterCandidatoXRonda = []
  public rondaRadioButton;
  public paisSelected;

  public users
  public selectedPresidente = '';
  constructor() { }

  ngOnInit(): void {
  }
  getSelected(ev){
    console.log(this.selectedPresidente);

  }

  filterByPais(event, idPais){
    if(event){
      this.paisSelected = idPais
      this.filterPais = this.candidatos.filter(elem =>{
        return elem.pais == idPais;
      })

    }

  }

  rondaSelect(ronda){
    this.filterCandidatoXRonda = this.candidatos.filter(elem =>{
      if(elem.ronda == ronda) return elem.pais == this.paisSelected
    })
    console.log(this.candidatos);
  }

}
