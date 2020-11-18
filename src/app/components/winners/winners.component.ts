import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CandidatoService } from '../../services/candidato.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss'],
  providers: [UserService, CandidatoService],
})
export class WinnersComponent implements OnInit {
  public token;
  public candidatos
  public peticion

  public winPresi = []
  public winVice = []
  public winSec = []
  constructor(
    private db: AngularFirestore,
    private _candidatoService: CandidatoService,
    private _userService: UserService,
  ) {
    this.token = this._userService.getToken();
   }

  ngOnInit(): void {
    this.getCandidatos()
  }

  getPromise(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._candidatoService.getCandidatos(this.token).subscribe((res) => {
        this.candidatos = res.datos;
        resolve(res);
      });
    });
  }

  getCandidatos(){
    this.peticion = this.db.collection('Candidato', (ref) =>
    ref.where('ronda', '==', 'Ganador')
  );
  this.peticion.valueChanges().subscribe((res) => {
    this.candidatos = res
    console.log(res);

    this.winPresi = this.candidatos.filter((elem) => {
      if(elem.puestoPostulado === 'Presidente'){
        return elem.ronda == 'Ganador';
      }
    });

    this.winVice = this.candidatos.filter((elem) => {
      if(elem.puestoPostulado === 'Vicepresidente'){
        return elem.ronda == 'Ganador';
      }
    });

    this.winSec = this.candidatos.filter((elem) => {
      if(elem.puestoPostulado === 'Secretario'){
        return elem.ronda == 'Ganador';
      }
  })
  });



  }

}
