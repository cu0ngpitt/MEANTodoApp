import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
//import { catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ListService {

  constructor(private http: HttpClient) { }

  getAllTodos(username) {
    return this.http.post('/todos/lists', username, httpOptions);
  }

  addItem(newTodo) {
    return this.http.post('/todos/add', newTodo, httpOptions);
  }

  markCompleted(info) {
    return this.http.post('/todos/completed', info, httpOptions);
  }

  markNotCompleted(info) {
    return this.http.post('/todos/notcompleted', info, httpOptions);
  }

  deleteOne(info) {
    return this.http.post('/todos/deleteone', info, httpOptions);
  }

  deleteCompleted(info) {
    return this.http.post('/todos/delete', info, httpOptions);
  }

}
