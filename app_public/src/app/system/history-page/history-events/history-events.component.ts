import { Component, Input, OnInit } from '@angular/core';
import { APPEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Input() events: APPEvent[] = [];
  searchValue = '';
  searchPlaceholder = 'Sum';
  searchField = 'amount';

  constructor() { }

  ngOnInit() {
    this.events.forEach((e) => {
      e.catName = this.categories.find(c => c._id === e.category).name;
    });
  }

  getEventClass(e: APPEvent) {
    return {
      'label': true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income'
    };
  }

  changeCriteria(field: string) {
    const namesMap = {
      amount: 'Sum',
      date: 'Date',
      category: 'Category',
      type: 'Type'
    };
    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }

}
