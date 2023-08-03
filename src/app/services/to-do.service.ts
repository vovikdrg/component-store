import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface ToDo {
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private http: HttpClient) { }

  getToDos(): Observable<string> {
    return of("Success")
      .pipe(delay(1000));
  }

  addNewTodo(product: string): Observable<string> {
    return this.http
      .get("https://run.mocky.io/v3/a3e0c394-85bc-4aae-b0e9-fc65c95481cb?mocky-delay=2000ms")
      .pipe(map((_) => product));
  }
}
