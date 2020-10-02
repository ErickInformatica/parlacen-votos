import { Component, OnInit, ViewChild } from '@angular/core';
import { CandidatoService } from '../../../services/candidato.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ClrDatagrid } from '@clr/angular';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.scss'],
  providers: [UserService, CandidatoService],
})
export class CandidatosComponent implements OnInit {
  @ViewChild(ClrDatagrid) dg: ClrDatagrid;
  public variablesModals = {
    edit: false,
    delete: false,
    add: false,
  };
  public token;
  public candidatos;

  indexPais: Number;
  cType = '';
  rondaPais = '';

  paisTypeArray = [
    { pais: 'Guatemala' },
    { pais: 'Honduras' },
    { pais: 'El Salvador' },
    { pais: 'Nicaragua' },
    { pais: 'Panama' },
    { pais: 'Republica Dominicana' },
  ];

  tiposRondas = [
    { nombre: 'Ronda 1' },
    { nombre: 'Ronda 2' },
    { nombre: 'Nuevo Votacion Ronda 1' },
    { nombre: 'Nuevo Votacion Ronda 2' },
    { nombre: 'Ganador' },
  ];

  puestos = [
    { puesto: 'Presidente' },
    { puesto: 'Vicepresidente' },
    { puesto: 'Secretario' },
  ];

  public newCandidato = {
    nombres: '',
    apellidos: '',
    email: '',
    vancada: '',
    image: '',
    ronda: '',
    pais: '',
    puestoPostulado: '',
  };

  public candidatoDeleteModel;

  public filtrarRondasArray = [];
  public filtrarXPuestoArray = [];
  public ArrayFinal = [];
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  imageUrl;
  public file;
  constructor(
    private _candidatoService: CandidatoService,
    private _userService: UserService,
    private storage: AngularFireStorage
  ) {
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getCandidatos();
  }

  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  getCandidatos() {
    this._candidatoService.getCandidatos(this.token).subscribe((res) => {
      this.candidatos = res.datos;
    });
  }

  getCandidato(id) {
    this._candidatoService.getCandidato(this.token, id).subscribe((res) => {
      this.candidatoDeleteModel = res;
    });
  }

  deleteCandidato(id) {
    this._candidatoService.deleteCandidato(this.token, id).subscribe(
      (res) => {
        this.getCandidatos();

        setTimeout(() => this.dg.resize());
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Candidato eliminado con exito',
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(()=> {
          this.filtrarXPuestoArray = this.candidatos.filter((elem) => {
            return elem.datos.puestoPostulado == this.cType;
          });
          let datosCandidatos = [];
          this.filtrarXPuestoArray.forEach((element) => {
            datosCandidatos.push(element.datos);
          });
          this.filtrarRondasArray = this.removeDuplicates(
            datosCandidatos,
            'ronda'
          );
          this.ArrayFinal = this.filtrarXPuestoArray.filter((elem) => {
            return elem.datos.ronda == this.rondaPais;
          });
          console.log(this.ArrayFinal);

        })
        setTimeout(() => this.dg.resize());
      },
      (err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    );
  }

  addCandidato() {
    if (this.file !== null) {
      const id = Math.random().toString(36).substring(2);
      const filePath = `paises/pais_${id}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.file);
      this.uploadPercent = task.percentageChanges();
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.urlImage = ref.getDownloadURL();
            this.urlImage.subscribe((url) => {
              if (url) {
                this.newCandidato.image = url.toString();
              }
              this._candidatoService
                .addCandidatos(this.token, this.newCandidato)
                .subscribe(
                  (res) => {
                    this.getCandidatos();
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Candidato añadido con exito',
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    setTimeout(()=> {
                      this.filtrarXPuestoArray = this.candidatos.filter((elem) => {
                        return elem.datos.puestoPostulado == this.cType;
                      });
                      let datosCandidatos = [];
                      this.filtrarXPuestoArray.forEach((element) => {
                        datosCandidatos.push(element.datos);
                      });
                      this.filtrarRondasArray = this.removeDuplicates(
                        datosCandidatos,
                        'ronda'
                      );
                      this.ArrayFinal = this.filtrarXPuestoArray.filter((elem) => {
                        return elem.datos.ronda == this.rondaPais;
                      });
                      console.log(this.ArrayFinal);

                    })
                    setTimeout(() => this.dg.resize());
                  },
                  (err) => {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'error',
                      title: err.error.message,
                      showConfirmButton: false,
                      timer: 2000,
                    });
                  }
                );
            });
          })
        )
        .subscribe((url) => {
          if (url) {
            console.log(url);
          }
        });
    }
  }

  uploadFile(evn) {
    this.file = evn.target.files[0];
    console.log(this.file);
  }

  changeCandidato(evt) {
    this.ArrayFinal = this.filtrarXPuestoArray.filter((elem) => {
      return elem.datos.ronda == this.rondaPais;
    });
    setTimeout(() => this.dg.resize());
  }

  resetData(ev) {
    this.filtrarXPuestoArray = this.candidatos.filter((elem) => {
      return elem.datos.puestoPostulado == this.cType;
    });
    let datosCandidatos = [];
    this.filtrarXPuestoArray.forEach((element) => {
      datosCandidatos.push(element.datos);
    });
    this.filtrarRondasArray = this.removeDuplicates(datosCandidatos, 'ronda');
  }
}
