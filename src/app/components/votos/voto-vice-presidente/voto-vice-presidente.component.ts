import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voto-vice-presidente',
  templateUrl: './voto-vice-presidente.component.html',
  styleUrls: ['./voto-vice-presidente.component.scss']
})
export class VotoVicePresidenteComponent implements OnInit {
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

  votosHonduras = [
    {
      nombre: "Juanito Honduras",
      texto: "esto es una prueba"
    },
    {
      nombre: "Pedriot Honduras",
      texto: "esto es una prueba2"
    },
    {
      nombre: "Cesar Honduras",
      texto: "esto es una prueba3"
    },
    {
      nombre: "luisito Honduras",
      texto: "esto es una prueba4"
    },
    {
      nombre: "Vini Honduras",
      texto: "esto es una prueba5"
    }
  ]


  public selectedPresidente = '';
  constructor() { }

  ngOnInit(): void {
  }
  getSelected(ev){
    console.log(this.selectedPresidente);

  }
}
