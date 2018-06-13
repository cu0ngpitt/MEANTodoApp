import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { List } from '../list';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ListService {
  newTodo: any;
  list: any;

  constructor(private http: HttpClient) { }

  getAllTodos() {
    return this.http.get('http://localhost:3000/todos/lists');
  }

  addItem(newTodo) {
    return this.http.post('http://localhost:3000/todos/add', newTodo, httpOptions);
  }

  markCompleted(list) {
    return this.http.post('http://localhost:3000/todos/completed', list, httpOptions);
  }

  markNotCompleted(list) {
    return this.http.post('http://localhost:3000/todos/notcompleted', list, httpOptions);
  }

  deleteCompleted(list) {
    return this.http.delete('http://localhost:3000/todos/delete', httpOptions);
  }

}
