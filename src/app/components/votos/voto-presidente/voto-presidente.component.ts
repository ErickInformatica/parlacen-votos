import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { VotoService } from '../../../services/votos.service';

@Component({
  selector: 'app-voto-presidente',
  templateUrl: './voto-presidente.component.html',
  styleUrls: ['./voto-presidente.component.scss'],
  providers: [UserService, VotoService]
})
export class VotoPresidenteComponent implements OnInit {
  public votoModel = {
    idCandidato: '',
    tipoVoto: '',
    puestoCandidato: 'Presidente',
    pais: ''
  }

  public imagenTitulo;
  public filterXPaisHonduras = []
  public token
  public candidatos
  public selectedPresidente = '';
  constructor(private _votoService: VotoService,
    private _userService: UserService,
    private _router: Router) {
      this.token = this._userService.getToken()
    }

  ngOnInit(): void {
    this.getVotosPresidente()
  }
  getSelected(ev, datos){
    this.votoModel.tipoVoto = ''
    console.log(datos);
  }

  getSelectedNoW(ev){
    this.votoModel.idCandidato = ''
    console.log(this.votoModel);
  }

  addPromise(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._votoService.addVoto(this.token, this.votoModel).subscribe((res) => {
        console.log(res);
        resolve(res);
      });
    });
  }

  addVoto(){
    this.addPromise().then(res=>{
      this.getVotosPresidente()
    })
  }

  getVotosPresidente(){
    this._votoService.getPrecidenteAVotar(this.token).subscribe(
      res=>{
        if(res.candidatos){
          this.candidatos = res.candidatos
          this.filterXPaisHonduras = this.candidatos.filter((elem) => {
            if(elem.datos.datosPais.nombrePais === 'Honduras'){
              return elem.datos.datosPais.nombrePais === 'Honduras'
            }
          });
         if(this.filterXPaisHonduras.length > 0) {
          this.imagenTitulo = this.filterXPaisHonduras[0].datos.datosPais.imagenPais
          this.votoModel.pais = this.filterXPaisHonduras[0].datos.datosPais.nombrePais
         }
           if(this.filterXPaisHonduras.length === 0 ){
            this._router.navigate(['/home/votoV/Vicepresidente/1ra'])
          }
        }
      }, err=>{
        if(err.error && err.error.message === "No hay candidatos a votar"){
          this._router.navigate(['/home/votoV/Vicepresidente/1ra'])
        }
      }
    )
  }
}
