import { Component } from '@angular/core';
import { faker } from '@faker-js/faker';
import { ToDo, ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-not-to-do',
  templateUrl: './not-to-do.component.html',
  styleUrls: ['./not-to-do.component.scss']
})
export class NotToDoComponent {
  toDos: ToDo[] = [];
  isLoading = false;

  constructor(private toDoService: ToDoService) { }

  ngOnInit() {
    this.loadToDos();
  }

  loadToDos() {
    this.isLoading = true;
    this.toDoService.getToDos()
      .subscribe((result: string) => {
        this.isLoading = false;
      });
  }

  addNewTodo() {
    var newTodo = faker.commerce.productName();
    this.toDoService.addNewTodo(newTodo)
      .subscribe((result) => {
        this.toDos = [...this.toDos, { title: newTodo }]
        this.loadToDos();
      });

  }
}
