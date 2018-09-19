import {AfterViewInit, Component,  Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit  {

  @Input()  currencyHistory: [any];

  chartOptions = {
    responsive: true
  };

  chartData = [];

  chartLabels = ['January', 'February', 'Mars', 'April'];


  ngOnInit(): void {
   this.chartLabels = this.currencyHistory.map(m => {
     return m.date;
   });
   const USDData = [];
   const BTCData = [];
   const GBPData = [];

   for (const month of this.currencyHistory) {
     USDData.push(month['usd']);
     BTCData.push(month['btc']);
     GBPData.push(month['gbp']);
   }

   this.chartData.push(
     { data: USDData, label: 'USD' },
     { data: BTCData, label: 'BTC' },
     { data: GBPData, label: 'GBP' });

  }
}
