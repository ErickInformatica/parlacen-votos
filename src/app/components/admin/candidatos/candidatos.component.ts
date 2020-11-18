import { Component, OnInit, ViewChild } from '@angular/core';
import { CandidatoService } from '../../../services/candidato.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ClrDatagrid } from '@clr/angular';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { PaisService } from '../../../services/pais.service';

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.scss'],
  providers: [UserService, CandidatoService, PaisService],
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
    { nombre: 'Vuelta 1' },
    { nombre: 'Vuelta 2' },
    { nombre: 'Nuevo Votacion Vuelta 1' },
    { nombre: 'Nuevo Votacion Vuelta 2' },
    { nombre: 'Segunda Votacion Vuelta 1' },
    { nombre: 'Segunda Votacion Vuelta 2' },
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
    orden: 0
  };
  public paisesData;
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
    private storage: AngularFireStorage,
    private _paisService: PaisService
  ) {
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getCandidatos();
    this.getPaises()
  }

  getPaises() {
    this._paisService.getPaises(this.token).subscribe((res) => {
      this.paisesData = res.datos;
    });
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

  getPromise(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._candidatoService.getCandidatos(this.token).subscribe((res) => {
        this.candidatos = res.datos;
        resolve(res);
      });
    });
  }

  addPromise(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.file !== null) {
        const id = Math.random().toString(36).substring(2);
        const filePath = `candidato/candidato_${id}`;
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

                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Candidato añadido con exito',
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      this.variablesModals.add = false
                      resolve(res)
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
            if (url) {}
          });
      }
    });
  }
  deletePromise(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this._candidatoService.deleteCandidato(this.token, id).subscribe(
        (res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Candidato eliminado con exito',
            showConfirmButton: false,
            timer: 1500,
          });
          this.variablesModals.delete = false
          resolve(res)
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
  }

  filters(){
    this.filtrarXPuestoArray = this.candidatos.filter((elem) => {
      return elem.datos.puestoPostulado == this.cType;
    });
    let datosCandidatos = [];
    this.filtrarXPuestoArray.forEach((element) => {
      datosCandidatos.push(element.datos);
    });
    this.filtrarRondasArray = this.removeDuplicates(datosCandidatos, 'ronda');
    this.ArrayFinal = this.filtrarXPuestoArray.filter((elem) => {
      return elem.datos.ronda == this.rondaPais;
    });
    setTimeout(() => this.dg.resize());
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
    this.deletePromise(id).then(()=>{
      this.getPromise().then(()=>{
        this.filters()
      })
    })
  }

  addCandidato() {
    this.addPromise().then(()=>{
      this.getPromise().then(()=>{
        this.filters()
      })
    })
  }

  uploadFile(evn) {
    this.file = evn.target.files[0];
  }

  changeCandidato(evt) {
    this.ArrayFinal = this.filtrarXPuestoArray.filter((elem) => {
      return elem.datos.ronda == this.rondaPais;
    });
    setTimeout(() => this.dg.resize());
  }

  resetData(ev) {
    this.rondaPais = ''
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
