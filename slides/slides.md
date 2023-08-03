---
theme: seriph
background: image/photo-1593966636571-7e1428ad5f39.jpeg
class: text-center
highlighter: shiki
lineNumbers: true
info: |
  ## Slidev Starter Template
  Presentation slides for developers.
transition: slide-left
title: Power Up Your Angular Apps with Component Store State Management
---

# Power Up Your Angular Apps with Component Store State Management

Welcome %first_name%,

Volodymyr (Vova) Bilyachat 

---
transition: fade-out
layout: center
---
# Before we begin

---
transition: fade-out
layout: center
---
# Promise not to subscribe

---
transition: fade-out
layout: center
---
# State management
- NGRX
- NGXS
- Akita


---
transition: fade-out
---
# Let's have a look at this code
```ts {all|1-3|5-6|13,19}
@Component({
  selector: 'app-not-to-do'
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
    this.toDoService.getToDos().subscribe((toDos: ToDo[]) => {
        this.toDos = toDos;
        this.isLoading = false;
      });
  }
  addNewTodo() {
    this.toDoService.addNewTodo(faker.commerce.productName())
      .subscribe((result) => {
        this.loadToDos();
      });

  }
}

```
---
transition: fade-out
layout: center
---

# Why do we need state management?
- Share data across components
- You can add extra layer of retry/caching logic
- Cleaner components and code
- Simplified testing

---
transition: fade-out
layout: center
---

# NGRX Component Store

- Completely independent from NGRX
- Small size (14.49KB)
- Simple API just updater/effect/selector
- Can combine selectors to reshape store
- It also supports lazy loading

---
transition: fade-out
layout: center
---

# How to start?
  
  ```bash
  npm install @ngrx/component-store
  npm install @ngrx/schematics --save-dev
  ```

---
transition: fade-out
layout: center
---
# Be lazy like me and use CLI to do your job

```bash
npx ng g component-store FeatureName  --dry-run
? To which component (path) should the component store be provided in? pages/not-to-do/not-to-do.component
? To which module (path) should the component store be provided in? 
CREATE src/app/feature-name.store.spec.ts (230 bytes)
CREATE src/app/feature-name.store.ts (320 bytes)
UPDATE src/app/feature/your-component.ts (939 bytes)
```

---
transition: fade-out
layout: center
---

# Define your state

```ts 
export interface ListState {
  todos: ToDo[];
  loading: 'INIT' | 'LOADING' | 'LOADED' | 'ERROR';
  userId: number;
};
```

---
transition: fade-out
layout: center
---

# Read - Select


```ts
export interface ListState {
  todos: ToDo[];
  loading: 'INIT' | 'LOADING' | 'LOADED' | 'ERROR';
  userId: number;
};

@Injectable()
export class ListStore extends ComponentStore<ListState> {
  readonly todos$ = this.select((state) => state.todos);
  readonly isLoading$ = this.select((state) => state.loading === 'LOADING');
  readonly isError$ = this.select((state) => state.loading === 'ERROR');
}
```
---
transition: fade-out
layout: center
---

# Write - updater

```ts{all|3,8}
@Injectable()
export class ListStore extends ComponentStore<ListState> {
  updateTodos = this.updater((state: ListState, todos: ToDo[]) => ({
    ...state,
    todos,
  }));

  removeTodo = this.updater((state: ListState, title: string) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.title !== title),
  }));
}
```

---
transition: fade-out
---

# Effects - effect

```ts{all|4|5|6|1,8-11}
import { ComponentStore, tapResponse } from '@ngrx/component-store';
@Injectable()
export class ListStore extends ComponentStore<ListState> {
  readonly saveNewTodo = this.effect((newTodo$: Observable<string>) => {
    return newTodo$.pipe(
      switchMap((query: string) =>
        this.listService.addNewTodo(query).pipe(
          tapResponse(
            () => { this.loadTodos() },
            (error: any) => { this.patchState({ loading: 'ERROR' }) }
          )
        )
      )
    );
  });
}
```
---
transition: fade-out
layout: center
---

# RxJs operators

- switchMap - cancelling previous subscription
- concatMap - waiting for previous subscription to complete
- exhaustMap - ignoring new subscription until previous completes
- mergeMap - allow multiple subscriptions to be active at the same time

---
transition: fade-out
layout: center
---

# Scope
- Component

```ts{all|1,8}
@Injectable()
export class ListStore extends ComponentStore<ListState> {
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListStore]
})
```
---
transition: fade-out
layout: center
---

- Singleton
```ts{all|1,8}
@Injectable({providedIn: 'root'})
export class ListStore extends ComponentStore<ListState> {
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})


@NgModule({
  providers: [ListStore],
})
```

---
transition: fade-out
layout: center
---

# Should i always use it ?
Short answer YesNoMaybe, It depends.


---
transition: fade-out
layout: center
---

# Is that it?

---
transition: fade-out
layout: center
---

# Questions?

- https://ngrx.io/guide/component-store

---
transition: fade-out
layout: center
---

# Next session

Github Actions in Action 


