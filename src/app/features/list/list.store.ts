import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, concatMap, exhaustMap, merge, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs';
import { ToDo, ToDoService } from 'src/app/services/to-do.service';

export interface ListState {
  todos: ToDo[];
  loading: 'INIT' | 'LOADING' | 'LOADED' | 'ERROR';
  userId: number;
  filter?: string;
};

@Injectable()
export class ListStore extends ComponentStore<ListState> {
  constructor(private listService: ToDoService) {
    super({
      todos: [],
      loading: 'INIT',
      userId: 1,
      filter: 'Product'
    });
  }

  readonly todos$ = this.select((state) => state.todos);
  readonly isLoading$ = this.select((state) => state.loading === 'LOADING');
  readonly isError$ = this.select((state) => state.loading === 'ERROR');
  readonly filter$ = this.select((state) => state.filter);
  readonly filteredTodos$ = this.select(this.todos$, this.filter$, (todos, filter) => {
    if (filter) {
      return todos.filter((todo) => todo.title.includes(filter));
    }
    return todos;
  });

  readonly saveNewTodo = this.effect((newTodo$: Observable<string>) => {
    return newTodo$.pipe(
      concatMap((toDo: string) => {
        this.patchState({ loading: 'LOADING' })
        return this.listService.addNewTodo(toDo)
          .pipe(
            tapResponse(
              (result) => {
                this.patchState({ loading: 'LOADED' })
                this.addTodo(result);
                this.loadTodos();
              },
              (error: any) => { this.patchState({ loading: 'ERROR' }) }
            )
          )
      })
    );
  });

  readonly loadTodos = this.effect((trigger$: Observable<void>) => {
    return trigger$.pipe(
      tap(() => this.patchState({ loading: 'LOADING' })),
      exhaustMap(() =>
        this.listService.getToDos()
          .pipe(
            tapResponse(
              (result: any) => {
                this.patchState({ loading: 'LOADED' })
              },
              (error: any) => this.patchState({ loading: 'ERROR' }),
            )
          )
      )
    );
  });

  readonly saveNewTodoWithUser = this.effect((newTodo$: Observable<string>) => {
    return newTodo$.pipe(
      withLatestFrom(this.select((state) => state.userId)),
      concatMap(([newToDo, userId]) =>
        this.listService.addNewTodo(newToDo).pipe(
          tapResponse(
            () => {
              this.loadTodos();
            },
            (error: any) => { this.patchState({ loading: 'ERROR' }) }
          )
        )
      )
    );
  });

  readonly mountFilterControl = this.effect((formControl$: Observable<FormControl>) => {
    return formControl$
      .pipe(
        switchMap((control: FormControl) => {
          const valueChanged$ = control.valueChanges.pipe(
            tapResponse((value) => {
              this.patchState({ filter: value })
            }, () => {
              this.patchState({ filter: '' })
            })
          )

          const filterToConrol$ = this.filter$.pipe(
            tap((value) => {
              control.setValue(value, { emitEvent: false })
            }
            ));

          return merge(valueChanged$, filterToConrol$);
        }
        ));
  })

  addTodo = this.updater((state: ListState, newToDo: string) => ({
    ...state,
    todos: [...state.todos, { title: newToDo }]
  }));

  removeTodo = this.updater((state: ListState, title: string) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.title !== title),
  }));



}
