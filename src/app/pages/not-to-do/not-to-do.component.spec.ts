import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotToDoComponent } from './not-to-do.component';

describe('NotToDoComponent', () => {
  let component: NotToDoComponent;
  let fixture: ComponentFixture<NotToDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotToDoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
