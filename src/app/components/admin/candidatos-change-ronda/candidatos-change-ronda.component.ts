import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ClrDatagrid } from '@clr/angular';
import Swal from 'sweetalert2';
import { CandidatoService } from '../../../services/candidato.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-candidatos-change-ronda',
  templateUrl: './candidatos-change-ronda.component.html',
  styleUrls: ['./candidatos-change-ronda.component.scss'],
  providers: [UserService, CandidatoService],
})
export class CandidatosChangeRondaComponent implements OnInit {
  public variablesModals = {
    edit: false,
    delete: false,
  };

  puestos = [
    { puesto: 'Presidente' },
    { puesto: 'Vicepresidente' },
    { puesto: 'Secretario' },
  ];
  paisTypeArray = [
    { pais: 'Guatemala' },
    { pais: 'El Salvador' },
    { pais: 'Nicaragua' },
    { pais: 'Panama' },
    { pais: 'Republica Dominicana' },
    { pais: 'Honduras' },
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

  public filterPais = [];
  public rondaSelectedChange = 'Vuelta 1';

  public filterCandidatoXRonda = [];
  public rondaRadioButton;
  public paisSelected;

  public updateCandidato = {
    candidatosId: [],
    rondaAntigua: '',
    ronda: 'Vuelta 1',
    pais: '',
    puestoPostulado: '',
  };

  public token;
  public candidatos = [];
  public filtrarRondasArray = [];
  public filtrarXPuestoArray = [];
  public ArrayFinal = [];
  public datosCandidatos = [];

  public users;
  public selectedPresidente = '';
  public prueba;
  form: FormGroup;
  get ordersFormArray() {
    if (this.ArrayFinal.length > 0) {
      return this.form.controls.orders as FormArray;
    }
  }

  constructor(
    private _candidatoService: CandidatoService,
    private _userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.token = this._userService.getToken();
    this.form = this.formBuilder.group({
      orders: new FormArray([]),
    });
  }

  private addCheckboxes() {
    if (this.ArrayFinal.length > 0) {
      let arr = <FormArray>this.form.controls.orders;
      arr.controls = [];
      this.ArrayFinal.forEach(() => {
        this.ordersFormArray.push(new FormControl(false));
      });
    }
  }

  ngOnInit(): void {
    this.getCandidatos();
  }
  getCandidatos() {
    this._candidatoService.getCandidatos(this.token).subscribe((res) => {
      this.candidatos = res.datos;
      console.log(res.datos);

    });
  }

  pruebaPromise(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.ArrayFinal.length > 0) {
        this.updateCandidato.candidatosId = this.form.value.orders
          .map((checked, i) => (checked ? this.ArrayFinal[i].id : null))
          .filter((v) => v !== null);
      }
      this._candidatoService
        .updateRonda(this.token, this.updateCandidato)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            console.log(err);
          }
        );
    });
  }

  getPromise(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._candidatoService.getCandidatos(this.token).subscribe((res) => {
        this.candidatos = res.datos;
        resolve(res);
      });
    });
  }

  filters() {
    this.filtrarXPuestoArray = this.candidatos.filter((elem) => {
      return elem.datos.puestoPostulado == this.updateCandidato.puestoPostulado;
    });
    this.filterPais = this.filtrarXPuestoArray.filter((elem) => {
      return elem.datos.datosPais.nombrePais == this.updateCandidato.pais;
    });
    let datosCandidatos = [];
    this.filterPais.forEach((element) => {
      datosCandidatos.push(element.datos);
    });
    this.filtrarRondasArray = this.removeDuplicates(datosCandidatos, 'ronda');
    this.ArrayFinal = this.filterPais.filter((elem) => {
      return elem.datos.ronda == this.updateCandidato.rondaAntigua;
    });

    this.addCheckboxes();
  }

  updateRonda() {
    this.pruebaPromise().then(() => {
      this.getPromise().then(() => {
        this.filters();
      });
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

  resetData(ev) {
    this.updateCandidato.pais = '';
    this.ArrayFinal = [];
    this.filterPais = [];
    this.filtrarXPuestoArray = this.candidatos.filter((elem) => {
      return elem.datos.puestoPostulado == this.updateCandidato.puestoPostulado;
    });
  }

  getSelected(ev) {}

  filterByPais(event, idPais) {
    if (event) {
      this.updateCandidato.rondaAntigua = '';
      this.ArrayFinal = [];
      this.updateCandidato.pais = idPais;
      this.filterPais = this.filtrarXPuestoArray.filter((elem) => {
        return elem.datos.datosPais.nombrePais == idPais;
      });

      let datosCandidatos = [];
      this.filterPais.forEach((element) => {
        datosCandidatos.push(element.datos);
      });
      this.filtrarRondasArray = this.removeDuplicates(datosCandidatos, 'ronda');
    }
  }

  changeCandidato(evt) {
    this.ArrayFinal = this.filterPais.filter((elem) => {
      return elem.datos.ronda == this.updateCandidato.rondaAntigua;
    });
    this.addCheckboxes();
  }
}
