import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Message } from '../../../shared/models/message.model';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy, OnInit {

  sub1: Subscription;
  message: Message;

  @Output() onCategoryAdd = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    this.message = new Message('success', '');
  }

  onSubmit(form: NgForm) {
    let {name, capacity} = form.value;
    if (capacity < 0) {
      capacity *= -1;
    }

    const category = new Category(name, capacity);

    this.sub1 = this.categoriesService.addCategory(category)
      .subscribe((category: Category) => {
        form.reset();
        form.form.patchValue({capacity: 1});
        this.onCategoryAdd.emit(category);
        this.message.text = 'Category was successfully added.';
        window.setTimeout(() => this.message.text = '', 5000);
      });

  }

  ngOnDestroy() {
    if (this.sub1)  {
      this.sub1.unsubscribe();
    }
  }

}
