import { TestBed } from '@angular/core/testing';

import { ToDoService } from './to-do.service';

fdescribe('ToDoService', () => {
  let service: ToDoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoService);
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
