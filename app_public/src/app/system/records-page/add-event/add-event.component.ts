import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

import { Category } from '../../shared/models/category.model';
import { APPEvent } from '../../shared/models/event.model';
import { EventsService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { Message } from '../../../shared/models/message.model';
import { Subscription } from 'rxjs';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements  OnDestroy {

  sub1: Subscription;
  sub2: Subscription;
  @Input() categories: Category[] = [];

  types = [
    {type: 'income', label: 'Income'},
    {type: 'outcome', label: 'Outcome'}
  ];

  message: Message;

  constructor(private eventsService: EventsService,
              private billService: BillService) {
  }


  private showMessage(type: string, text: string) {
    this.message = new Message(type, text);
    window.setTimeout(() => this.message.text = '', 5000);
  }

  onSubmit(form: NgForm) {
    let {amount, description, category, type} = form.value;
    if (amount < 0) amount *= -1;

    if (!category || typeof category !== 'string') {
      this.showMessage('danger', `You should choose category too`);
      return;
    }
    const event = new APPEvent(
      type, amount, category,
      moment().format('DD.MM.YYYY HH:mm:ss'), description
    );
    this.sub1 = this.billService.getBill()
      .subscribe((bill: Bill) => {
        let value = 0;
        if (type === 'outcome') {
          if (amount > bill.value) {
            this.showMessage('danger', `There isn't enough money on your account. You need ${amount - bill.value}`);
            return;
          } else {
            value = bill.value - amount;
          }
        } else {
          value = bill.value + amount;
        }

        this.sub2 = this.billService.updateBill({value, currency: bill.currency}).pipe(
          mergeMap(() => this.eventsService.addEvent(event))
        ).subscribe(() => {
          this.showMessage('success', 'Event was successfully added');
            form.reset();
          });
      });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

}
