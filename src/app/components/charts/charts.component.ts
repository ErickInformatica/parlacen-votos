import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartLabel,
  ChartColor,
  ChartType,
  BaseChartDirective,
  ChartOptions,
} from '@rinminase/ng-charts';
import { AngularFirestore } from '@angular/fire/firestore';
import 'chartjs-plugin-labels';
import { UserService } from '../../services/user.service';
import { VotoService } from '../../services/votos.service';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  providers: [UserService, VotoService],
})
export class ChartsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  cType = 'pie';
  chartTypeArray = [
    { type: 'line', text: 'Lineas' },
    { type: 'bar', text: 'Barras' },
    { type: 'horizontalBar', text: 'Barras Horizontales' },
    { type: 'pie', text: 'Circular' },
  ];
  chartData = [{ data: [] }];
  chartLabels = [];
  chartOptions: ChartOptions = {
    responsive: true,
    plugins:{
      labels: [
        {
          render: 'percentage',
          arc: true,
          position: 'border',
          fontSize: 14,
          fontStyle: 'bold',
          fontColor: '#000',
          fontFamily: '"Lucida Console", Monaco, monospace',
          precision: 2,
        },
        {
          render: 'value',
          arc: true,
          fontSize: 14,
          fontStyle: 'bold',
          fontColor: '#000',
          fontFamily: '"Lucida Console", Monaco, monospace',
          position: 'outside',
        },
      ],
    }
  };
  chartColors: ChartColor = [
    {
      backgroundColor: [
        '#508BBF',
        '#F2B90C',
        '#F2A20C',
        '#ADC5D9',
        '#BFA68F',
        '#A61414',
        '#BF7839',
      ],
    },
  ];
  chartLegend = true;
  chartPlugins = [];
  principalColors = [
    {
      borderColor: 'hsl(198, 100%, 24%)',
      backgroundColor: 'hsl(198, 100%, 24%, 0.3)',
    },
    {
      borderColor: 'hsl(9, 100%, 43%)',
      backgroundColor: 'hsl(9, 100%, 43%, 0.3)',
    },
  ];
  pieColors = [
    {
      backgroundColor: ['red', '#0F0', 'rgba(41, 182, 246,0.75)'],
      borderColor: ['rgb(250,120,100)', 'green', '#0086c3'],
    },
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

  rondaSeleccionada = ''

  //Variable Char Presidente
  chartDataPresidente = [{ data: [] }];
  chartLabelsPresidente = [];

  // Variable Char Vicepresidente
  // El Salvador
  chartDataViceSalvador = [{ data: [] }];
  chartLabelsViceSalvador = [];
  // Guatemala
  chartDataViceGuatemala = [{ data: [] }];
  chartLabelsViceGuatemala = [];
  // Nicaragua
  chartDataViceNicaragua = [{ data: [] }];
  chartLabelsViceNicaragua = [];
  // Panama
  chartDataVicePanama = [{ data: [] }];
  chartLabelsVicePanama = [];
  // Republica Dominicana
  chartDataViceDominicana = [{ data: [] }];
  chartLabelsViceDominicana = [];

  // Variable Char Secretario
  // El Salvador
  chartDataSecSalvador = [{ data: [] }];
  chartLabelsSecSalvador = [];
  // Guatemala
  chartDataSecGuatemala = [{ data: [] }];
  chartLabelsSecGuatemala = [];
  // Nicaragua
  chartDataSecNicaragua = [{ data: [] }];
  chartLabelsSecNicaragua = [];
  // Panama
  chartDataSecPanama = [{ data: [] }];
  chartLabelsSecPanama = [];
  // Republica Dominicana
  chartDataSecDominicana = [{ data: [] }];
  chartLabelsSecDominicana = [];
  // Honduras
  chartDataSecHonduras = [{ data: [] }];
  chartLabelsSecHonduras = [];

  // ALL
  chartDataAll = [
    { data: [] }
  ];
  chartLabelsAll = [];

  // Grafica general
  chartDataGeneral = [{ data: []}]
  chartLabelsGeneral = []
  chartLegendGeneral = false;
  chartOptionsGeneral: ChartOptions = {
    responsive: true,
    plugins:{
      labels: [
        {
          render: 'value',
          arc: true,
          fontSize: 14,
          fontStyle: 'bold',
          fontColor: '#000',
          fontFamily: '"Lucida Console", Monaco, monospace',
          position: 'outside',
        },
      ],
    }
  };

  private lineChart: any;
  items;
  public imagenTitulo;
  public filterXPaisPanama = [];
  public filterXPaisNicaragua = [];
  public filterXPaisSalvador = [];
  public filterXPaisDominicana = [];
  public filterXPaisGuatemala = [];
  public filterXPaisHonduras = [];
  public all = []
  public token;
  public candidatos;
  constructor(
    private db: AngularFirestore,
    private _votoService: VotoService,
    private _userService: UserService
  ) {
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {}

  sumdata(array){
    if(array.length > 0){
      return array.reduce(function(a, b){
        return a + b;
     }, 0);
    }

  }

  getVotosPresi() {
    this.items = this.db.collection('Conteos', (ref) =>
      ref
        .where('ronda', '==', this.rondaSeleccionada)
        .where('puestoVoto', '==', 'Presidente')
        .where('datosPais.nombrePais', '==', 'Honduras')
    );
    this.items.valueChanges().subscribe((res) => {
      if (res) {
        this.filterXPaisHonduras = res;
        if (this.filterXPaisHonduras.length > 0) {
          this.chartDataPresidente[0].data = [];
          this.chartLabelsPresidente = [];
          for (let key of Object.keys(this.filterXPaisHonduras)) {
            this.chartDataPresidente[0].data.push(
              this.filterXPaisHonduras[key].numeroVotos
            );
            if (this.filterXPaisHonduras[key].datosCandidato !== '') {
              let hour = this.filterXPaisHonduras[key].datosCandidato
                .nombreCandidato;
              this.chartLabelsPresidente.push(hour);
            }
            if (
              this.filterXPaisHonduras[key].tipoVoto === 'Nulo' ||
              this.filterXPaisHonduras[key].tipoVoto === 'En Blanco'
            ) {
              let hour = this.filterXPaisHonduras[key].tipoVoto;
              this.chartLabelsPresidente.push(hour);
            }
          }
          this.chartDataGeneral[0].data.push(this.sumdata(this.chartDataPresidente[0].data))
          this.chartLabelsGeneral.push('Presidente(a) Honduras')
        }
      }
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

  getAll(){
    this.getVotosPresi()
    this.getVotosVice()
    this.getVotosSec()
    this.items = this.db.collection('Conteos', (ref) =>
      ref
        .where('ronda', '==', this.rondaSeleccionada)
    );
    this.items.valueChanges().subscribe((res) => {
      this.all = res
      console.log(this.all);

      // let filtrarPaises = [...new Map(this.all.map(item => [item.datosPais.nombrePais, item])).values()]
      // console.log(filtrarPaises);

      if (this.all.length > 0) {
        this.chartDataAll[0].data = [];
        this.chartLabelsAll = [];
        let candidatosGuatemala = this.all.filter((elem) => {
          if (elem.datosPais.nombrePais === 'Guatemala') {
            return elem.datosPais.nombrePais === 'Guatemala';
          }
        });
        for (let key of Object.keys(this.all)) {

          this.chartDataAll[0].data.push(
            this.all[key].numeroVotos
          );


          if (this.all[key].datosCandidato !== '') {
            let hour = this.all[key].datosCandidato
              .nombreCandidato;
            this.chartLabelsAll.push(hour);
          }
          if (
            this.all[key].tipoVoto === 'Nulo' ||
            this.all[key].tipoVoto === 'En Blanco'
          ) {
            let hour = this.all[key].tipoVoto;
            this.chartLabelsAll.push(hour);
          }
        }
      }
    })
  }

  getVotosSec() {
    this.items = this.db.collection('Conteos', (ref) =>
      ref
        .where('ronda', '==', this.rondaSeleccionada)
        .where('puestoVoto', '==', 'Secretario')
    );
    this.items.valueChanges().subscribe((res) => {
      if (res) {
        this.candidatos = res;
        this.filterXPaisPanama = this.candidatos.filter((elem) => {
          if (elem.datosPais.nombrePais === 'Panama') {
            return elem.datosPais.nombrePais === 'Panama';
          }
        });
        if (this.filterXPaisPanama.length > 0) {
          this.chartDataSecPanama[0].data = [];
          this.chartLabelsSecPanama = [];
          for (let key of Object.keys(this.filterXPaisPanama)) {
            this.chartDataSecPanama[0].data.push(
              this.filterXPaisPanama[key].numeroVotos
            );
            if (this.filterXPaisPanama[key].datosCandidato !== '') {
              let hour = this.filterXPaisPanama[key].datosCandidato
                .nombreCandidato;
              this.chartLabelsSecPanama.push(hour);
            }
            if (
              this.filterXPaisPanama[key].tipoVoto === 'Nulo' ||
              this.filterXPaisPanama[key].tipoVoto === 'En Blanco'
            ) {
              let hour = this.filterXPaisPanama[key].tipoVoto;
              this.chartLabelsSecPanama.push(hour);
            }
          }
          this.chartDataGeneral[0].data.push(this.sumdata(this.chartDataSecPanama[0].data))
          this.chartLabelsGeneral.push('Secretario(a) Panama')
        }

        this.filterXPaisNicaragua = this.candidatos.filter((elem) => {
          if (elem.datosPais.nombrePais === 'Nicaragua') {
            return elem.datosPais.nombrePais === 'Nicaragua';
          }
        });
        if (this.filterXPaisNicaragua.length > 0) {
          this.chartDataSecNicaragua[0].data = [];
          this.chartLabelsSecNicaragua = [];
          for (let key of Object.keys(this.filterXPaisNicaragua)) {
            this.chartDataSecNicaragua[0].data.push(
              this.filterXPaisNicaragua[key].numeroVotos
            );
            if (this.filterXPaisNicaragua[key].datosCandidato !== '') {
              let hour = this.filterXPaisNicaragua[key].datosCandidato
                .nombreCandidato;
              this.chartLabelsSecNicaragua.push(hour);
            }
            if (
              this.filterXPaisNicaragua[key].tipoVoto === 'Nulo' ||
              this.filterXPaisNicaragua[key].tipoVoto === 'En Blanco'
            ) {
              let hour = this.filterXPaisNicaragua[key].tipoVoto;
              this.chartLabelsSecNicaragua.push(hour);
            }
          }
          this.chartDataGeneral[0].data.push(this.sumdata(this.chartDataSecNicaragua[0].data))
          this.chartLabelsGeneral.push('Secretario(a) Nicaragua')
        }

        this.filterXPaisDominicana = this.candidatos.filter((elem) => {
          if (elem.datosPais.nombrePais === 'Republica Dominicana') {
            return elem.datosPais.nombrePais === 'Republica Dominicana';
          }
        });

        if (this.filterXPaisDominicana.length > 0) {
          this.chartDataSecDominicana[0].data = [];
          this.chartLabelsSecDominicana = [];
          for (let key of Object.keys(this.filterXPaisDominicana)) {
            this.chartDataSecDominicana[0].data.push(
              this.filterXPaisDominicana[key].numeroVotos
            );
            if (this.filterXPaisDominicana[key].datosCandidato !== '') {
              let hour = this.filterXPaisDominicana[key].datosCandidato
                .nombreCandidato;
              this.chartLabelsSecDominicana.push(hour);
            }
            if (
              this.filterXPaisDominicana[key].tipoVoto === 'Nulo' ||
              this.filterXPaisDominicana[key].tipoVoto === 'En Blanco'
            ) {
              let hour = this.filterXPaisDominicana[key].tipoVoto;
              this.chartLabelsSecDominicana.push(hour);
            }

          }
          this.chartDataGeneral[0].data.push(this.sumdata(this.chartDataSecDominicana[0].data))
          this.chartLabelsGeneral.push('Secretario(a) Republica Dominicana')
        }

        this.filterXPaisGuatemala = this.candidatos.filter((elem) => {
          if (elem.datosPais.nombrePais === 'Guatemala') {
            return elem.datosPais.nombrePais === 'Guatemala';
          }
        });
        if (this.filterXPaisGuatemala.length > 0) {
          this.chartDataSecGuatemala[0].data = [];
          this.chartLabelsSecGuatemala = [];
          for (let key of Object.keys(this.filterXPaisGuatemala)) {
            this.chartDataSecGuatemala[0].data.push(
              this.filterXPaisGuatemala[key].numeroVotos
            );
            if (this.filterXPaisGuatemala[key].datosCandidato !== '') {
              let hour = this.filterXPaisGuatemala[key].datosCandidato
                .nombreCandidato;
              this.chartLabelsSecGuatemala.push(hour);
            }
            if (
              this.filterXPaisGuatemala[key].tipoVoto === 'Nulo' ||
              this.filterXPaisGuatemala[key].tipoVoto === 'En Blanco'
            ) {
              let hour = this.filterXPaisGuatemala[key].tipoVoto;
              this.chartLabelsSecGuatemala.push(hour);
            }
          }
          this.chartDataGeneral[0].data.push(this.sumdata(this.chartDataSecGuatemala[0].data))
          this.chartLabelsGeneral.push('Secretario(a) Guatemala')
        }

        this.filterXPaisSalvador = this.candidatos.filter((elem) => {
          if (elem.datosPais.nombrePais === 'El Salvador') {
            return elem.datosPais.nombrePais === 'El Salvador';
          }
        });
        if (this.filterXPaisSalvador.length > 0) {
          this.chartDataSecSalvador[0].data = [];
          this.chartLabelsSecSalvador = [];
          for (let key of Object.keys(this.filterXPaisSalvador)) {
            this.chartDataSecSalvador[0].data.push(
              this.filterXPaisSalvador[key].numeroVotos
            );
            if (this.filterXPaisSalvador[key].datosCandidato !== '') {
              let hour = this.filterXPaisSalvador[key].datosCandidato
                .nombreCandidato;
              this.chartLabelsSecSalvador.push(hour);
            }
            if (
              this.filterXPaisSalvador[key].tipoVoto === 'Nulo' ||
              this.filterXPaisSalvador[key].tipoVoto === 'En Blanco'
            ) {
              let hour = this.filterXPaisSalvador[key].tipoVoto;
              this.chartLabelsSecSalvador.push(hour);
            }
          }
          this.chartDataGeneral[0].data.push(this.sumdata(this.chartDataSecSalvador[0].data))
          this.chartLabelsGeneral.push('Secretario(a) El Salvador')
        }

        this.filterXPaisHonduras = this.candidatos.filter((elem) => {
          if (elem.datosPais.nombrePais === 'Honduras') {
            return elem.datosPais.nombrePais === 'Honduras';
          }
        });
        if (this.filterXPaisHonduras.length > 0) {
          this.chartDataSecHonduras[0].data = [];
          this.chartLabelsSecHonduras = [];
          for (let key of Object.keys(this.filterXPaisHonduras)) {
            this.chartDataSecHonduras[0].data.push(
              this.filterXPaisHonduras[key].numeroVotos
            );
            if (this.filterXPaisHonduras[key].datosCandidato !== '') {
              let hour = this.filterXPaisHonduras[key].datosCandidato
                .nombreCandidato;
              this.chartLabelsSecHonduras.push(hour);
            }
            if (
              this.filterXPaisHonduras[key].tipoVoto === 'Nulo' ||
              this.filterXPaisHonduras[key].tipoVoto === 'En Blanco'
            ) {
              let hour = this.filterXPaisHonduras[key].tipoVoto;
              this.chartLabelsSecHonduras.push(hour);
            }
          }
          this.chartDataGeneral[0].data.push(this.sumdata(this.chartDataSecHonduras[0].data))
          this.chartLabelsGeneral.push('Secretario(a) Honduras')
        }
      }
    });
  }

  getVotosVice() {
    this.items = this.db.collection('Conteos', (ref) =>
      ref
        .where('ronda', '==', this.rondaSeleccionada)
        .where('puestoVoto', '==', 'Vicepresidente')
    );
    this.items.valueChanges().subscribe((res) => {
      if (res) {
        this.candidatos = res;
        this.filterXPaisPanama = this.candidatos.filter((elem) => {
          if (elem.datosPais.nombrePais === 'Panama') {
            return elem.datosPais.nombrePais === 'Panama';
          }
        });
        if (this.filterXPaisPanama.length > 0) {
          this.chartDataVicePanama[0].data = [];
          this.chartLabelsVicePanama = [];
          for (let key of Object.keys(this.filterXPaisPanama)) {
            this.chartDataVicePanama[0].data.push(
              this.filterXPaisPanama[key].numeroVotos
            );
            if (this.filterXPaisPanama[key].datosCandidato !== '') {
              let hour = this.filterXPaisPanama[key].datosCandidato
                .nombreCandidato;
              this.chartLabelsVicePanama.push(hour);
            }
            if (
              this.filterXPaisPanama[key].tipoVoto === 'Nulo' ||
              this.filterXPaisPanama[key].tipoVoto === 'En Blanco'
            ) {
              let hour = this.filterXPaisPanama[key].tipoVoto;
              this.chartLabelsVicePanama.push(hour);
            }
          }
          this.chartDataGeneral[0].data.push(this.sumdata(this.chartDataVicePanama[0].data))
          this.chartLabelsGeneral.push('Vicepresidente(a) Panama')
        }

        this.filterXPaisNicaragua = this.candidatos.filter((elem) => {
          if (elem.datosPais.nombrePais === 'Nicaragua') {
            return elem.datosPais.nombrePais === 'Nicaragua';
          }
        });
        if (this.filterXPaisNicaragua.length > 0) {
          this.chartDataViceNicaragua[0].data = [];
          this.chartLabelsViceNicaragua = [];
          for (let key of Object.keys(this.filterXPaisNicaragua)) {
            this.chartDataViceNicaragua[0].data.push(
              this.filterXPaisNicaragua[key].numeroVotos
            );
            if (this.filterXPaisNicaragua[key].datosCandidato !== '') {
              let hour = this.filterXPaisNicaragua[key].datosCandidato
                .nombreCandidato;
              this.chartLabelsViceNicaragua.push(hour);
            }
            if (
              this.filterXPaisNicaragua[key].tipoVoto === 'Nulo' ||
              this.filterXPaisNicaragua[key].tipoVoto === 'En Blanco'
            ) {
              let hour = this.filterXPaisNicaragua[key].tipoVoto;
              this.chartLabelsViceNicaragua.push(hour);
            }
          }
          this.chartDataGeneral[0].data.push(this.sumdata(this.chartDataViceNicaragua[0].data))
          this.chartLabelsGeneral.push('Vicepresidente(a) Nicaragua')
        }

        this.filterXPaisDominicana = this.candidatos.filter((elem) => {
          if (elem.datosPais.nombrePais === 'Republica Dominicana') {
            return elem.datosPais.nombrePais === 'Republica Dominicana';
          }
        });

        if (this.filterXPaisDominicana.length > 0) {
          this.chartDataViceDominicana[0].data = [];
          this.chartLabelsViceDominicana = [];
          for (let key of Object.keys(this.filterXPaisDominicana)) {
            this.chartDataViceDominicana[0].data.push(
              this.filterXPaisDominicana[key].numeroVotos
            );
            if (this.filterXPaisDominicana[key].datosCandidato !== '') {
              let hour = this.filterXPaisDominicana[key].datosCandidato
                .nombreCandidato;
              this.chartLabelsViceDominicana.push(hour);
            }
            if (
              this.filterXPaisDominicana[key].tipoVoto === 'Nulo' ||
              this.filterXPaisDominicana[key].tipoVoto === 'En Blanco'
            ) {
              let hour = this.filterXPaisDominicana[key].tipoVoto;
              this.chartLabelsViceDominicana.push(hour);
            }
          }
          this.chartDataGeneral[0].data.push(this.sumdata(this.chartDataViceDominicana[0].data))
          this.chartLabelsGeneral.push('Vicepresidente(a) Repuvlica Dominicana')
        }

        this.filterXPaisGuatemala = this.candidatos.filter((elem) => {
          if (elem.datosPais.nombrePais === 'Guatemala') {
            return elem.datosPais.nombrePais === 'Guatemala';
          }
        });
        if (this.filterXPaisGuatemala.length > 0) {
          this.chartDataViceGuatemala[0].data = [];
          this.chartLabelsViceGuatemala = [];
          for (let key of Object.keys(this.filterXPaisGuatemala)) {
            this.chartDataViceGuatemala[0].data.push(
              this.filterXPaisGuatemala[key].numeroVotos
            );
            if (this.filterXPaisGuatemala[key].datosCandidato !== '') {
              let hour = this.filterXPaisGuatemala[key].datosCandidato
                .nombreCandidato;
              this.chartLabelsViceGuatemala.push(hour);
            }
            if (
              this.filterXPaisGuatemala[key].tipoVoto === 'Nulo' ||
              this.filterXPaisGuatemala[key].tipoVoto === 'En Blanco'
            ) {
              let hour = this.filterXPaisGuatemala[key].tipoVoto;
              this.chartLabelsViceGuatemala.push(hour);
            }
          }
          this.chartDataGeneral[0].data.push(this.sumdata(this.chartDataViceGuatemala[0].data))
          this.chartLabelsGeneral.push('Vicepresidente(a) Guatemala')
        }

        this.filterXPaisSalvador = this.candidatos.filter((elem) => {
          if (elem.datosPais.nombrePais === 'El Salvador') {
            return elem.datosPais.nombrePais === 'El Salvador';
          }
        });
        if (this.filterXPaisSalvador.length > 0) {
          this.chartDataViceSalvador[0].data = [];
          this.chartLabelsViceSalvador = [];
          for (let key of Object.keys(this.filterXPaisSalvador)) {
            this.chartDataViceSalvador[0].data.push(
              this.filterXPaisSalvador[key].numeroVotos
            );
            if (this.filterXPaisSalvador[key].datosCandidato !== '') {
              let hour = this.filterXPaisSalvador[key].datosCandidato
                .nombreCandidato;
              this.chartLabelsViceSalvador.push(hour);
            }
            if (
              this.filterXPaisSalvador[key].tipoVoto === 'Nulo' ||
              this.filterXPaisSalvador[key].tipoVoto === 'En Blanco'
            ) {
              let hour = this.filterXPaisSalvador[key].tipoVoto;
              this.chartLabelsViceSalvador.push(hour);
            }
          }
          this.chartDataGeneral[0].data.push(this.sumdata(this.chartDataViceSalvador[0].data))
          this.chartLabelsGeneral.push('Vicepresidente(a) Salvador')
        }
      }
    });
  }
  changeChart(evt) {
    if (this.cType === 'pie') {
      this.chartColors = this.pieColors;
    } else {
      this.chartColors = this.principalColors;
    }
  }
}
