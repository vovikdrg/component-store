import { Component } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ToDo } from 'src/app/services/to-do.service';

export interface ListState {
  todos: ToDo[];
  loading: 'INIT' | 'LOADING' | 'LOADED' | 'ERROR';
  userId: number;
};

@Component({
  selector: 'app-extends',
  templateUrl: './extends.component.html',
  styleUrls: ['./extends.component.scss']
})
export class ExtendsComponent extends ComponentStore<ListState> {

  readonly todos$ = this.select((state) => state.todos);
  
  constructor() {
    super({ todos: [], loading: 'INIT', userId: 1 });
  }

}
