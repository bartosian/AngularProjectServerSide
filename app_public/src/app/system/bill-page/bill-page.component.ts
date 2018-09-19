import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Subscription } from 'rxjs';

import { BillService } from '../shared/services/bill.service';
import { Bill } from '../shared/models/bill.model';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;

  currency: any;
  bill: Bill;
  currencyHistory: any;

  isLoaded = false;
  isLoadedChart = false;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency(),
    ).subscribe((data: [Bill, any]) => {
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;
      this.sub2 = combineLatest(
        this.billService.getCurrencyHistory('2018-01-01'),
        this.billService.getCurrencyHistory('2017-06-01'),
        this.billService.getCurrencyHistory('2017-01-01'),
        this.billService.getCurrencyHistory('2016-06-01'),
        this.billService.getCurrencyHistory('2016-01-01'),
        this.billService.getCurrencyHistory('2015-06-01'),
        this.billService.getCurrencyHistory('2015-01-01'),
        this.billService.getCurrencyHistory('2014-06-01')
      ).subscribe((data: [any, any, any, any, any, any, any, any]) => {
        const dataArr = data.slice(2)
          .map(m => {
            const { date, rates } = m;
            return {
              date,
              'usd': rates['USD'],
              'btc': rates['BTC'],
              'gbp': rates['GBP']
            };
          });
        this.currencyHistory = dataArr;
        this.isLoadedChart = true;
      });
    });
  }

  onRefresh() {
    this.isLoaded = false;
    this.isLoadedChart = false;
    this.sub3 = this.billService.getCurrency()
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
        this.isLoadedChart = true;
      });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
    if (this.sub3) {
      this.sub3.unsubscribe();
    }
  }
}
