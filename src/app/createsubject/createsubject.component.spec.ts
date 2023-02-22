import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesubjectComponent } from './createsubject.component';

describe('CreatesubjectComponent', () => {
  let component: CreatesubjectComponent;
  let fixture: ComponentFixture<CreatesubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatesubjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatesubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
