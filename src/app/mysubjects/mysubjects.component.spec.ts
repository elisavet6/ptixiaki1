import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MysubjectsComponent } from './mysubjects.component';

describe('MysubjectsComponent', () => {
  let component: MysubjectsComponent;
  let fixture: ComponentFixture<MysubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MysubjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MysubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
