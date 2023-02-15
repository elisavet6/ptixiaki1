import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideostreamingComponent } from './videostreaming.component';

describe('VideostreamingComponent', () => {
  let component: VideostreamingComponent;
  let fixture: ComponentFixture<VideostreamingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideostreamingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideostreamingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
