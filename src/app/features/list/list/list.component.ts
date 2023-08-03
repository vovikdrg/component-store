import { Component } from '@angular/core';
import { ListStore } from '../list.store';
import { faker } from '@faker-js/faker';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListStore]
})
export class ListComponent {
  isLoading$ = this.listStore.isLoading$;
  toDos$ = this.listStore.todos$;
  filteredTodos$ = this.listStore.filteredTodos$;
  filter = new FormControl();
  constructor(private listStore: ListStore) { }

  ngOnInit() {
    this.listStore.loadTodos();
    this.listStore.mountFilterControl(this.filter);
    this.listStore.patchState({filter: 'ETF'})
  }

  addNewTodo() {
    this.listStore.saveNewTodo(faker.commerce.productName())
  }

  deleteItem(item:any){
    this.listStore.removeTodo(item.title);
  }
}
