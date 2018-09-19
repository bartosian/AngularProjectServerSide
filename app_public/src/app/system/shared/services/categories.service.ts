import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseApi } from '../../../shared/core/base-api';
import { Category } from '../models/category.model';

@Injectable()
export class CategoriesService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  addCategory(category: Category): Observable<Category> {
    return this.post('api/categories', category);
  }

  getCategories(): Observable<Category[]> {
    return this.get('api/categories');
  }

  updateCategory(category: Category): Observable<Category> {
    return this.put(`api/categories/${category._id}`, category);
  }

  getCategoryById(id: string): Observable<Category> {
    return this.get(`api/categories/${id}`);
  }
}
