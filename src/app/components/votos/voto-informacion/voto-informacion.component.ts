import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voto-informacion',
  templateUrl: './voto-informacion.component.html',
  styleUrls: ['./voto-informacion.component.scss']
})
export class VotoInformacionComponent implements OnInit {
  public variablesModals = {
    inicio: false
  }

  constructor(public _router: Router) { }

  ngOnInit(): void {
  }

  redirect(){
    this._router.navigate([`user/votoP/Presidente/1ra`])
  }

}
