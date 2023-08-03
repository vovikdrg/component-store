import { of } from 'rxjs';
import { ListStore } from './list.store';
import { ToDoService } from 'src/app/services/to-do.service';
const serviceMock: ToDoService = <any>{
  getToDos: () => of(''),
  addNewTodo: () => of('')
};
describe('ListStore', () => {
  const componentStore = new ListStore(serviceMock);

  it('should be created', () => {
    expect(componentStore).toBeTruthy();
  });
});
