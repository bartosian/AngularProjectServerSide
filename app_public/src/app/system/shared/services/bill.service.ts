import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Bill } from '../models/bill.model';
import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class BillService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  getBill(): Observable<Bill> {
    return this.get('api/bill');
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.put('api/bill', bill);
  }

  getCurrency(): Observable<any> {
    return this.http.get(`http://data.fixer.io/api/latest?access_key=c10bff297e8e66ebe24134404f6a7bfc`);
  }

  getCurrencyHistory(date: string): Observable<any> {
    return this.http.get(`http://data.fixer.io/api/${date}?access_key=c10bff297e8e66ebe24134404f6a7bfc`);
  }

}
