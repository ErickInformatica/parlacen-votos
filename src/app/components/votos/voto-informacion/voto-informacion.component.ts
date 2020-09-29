import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voto-informacion',
  templateUrl: './voto-informacion.component.html',
  styleUrls: ['./voto-informacion.component.scss']
})
export class VotoInformacionComponent implements OnInit {
  public variablesModals = {
    inicio: false
  }

  constructor() { }

  ngOnInit(): void {
  }

}
