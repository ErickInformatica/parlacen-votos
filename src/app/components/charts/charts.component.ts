import { Component, OnInit } from '@angular/core';
import { ChartLabel, ChartColor, ChartType } from '@rinminase/ng-charts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  cType = 'line';
  chartTypeArray = [
    { type: 'line', text: 'Lineas' },
    { type: 'bar', text: 'Barras' },
    { type: 'horizontalBar', text: 'Barras Horizontales' },
    { type: 'pie', text: 'Circular' },
  ];
  chartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [22, 13, 25, 65, 52, 45, 70], label: 'Series B' },
  ];
  chartLabels: ChartLabel = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];
  chartOptions = {
    responsive: true,
  };
  chartColors: ChartColor;
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
  pieColors = [{
    backgroundColor: ['red', '#0F0', 'rgba(41, 182, 246,0.75)'],
    borderColor: ['rgb(250,120,100)', 'green', '#0086c3']
  }];
  constructor() {}

  ngOnInit(): void {
    this.chartColors = this.principalColors;
  }

  changeChart(evt){
    if (this.cType === 'pie') {
      this.chartColors = this.pieColors;
    }else{
      this.chartColors = this.principalColors
    }
  }
}
