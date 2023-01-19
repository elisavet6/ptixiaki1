import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnakoinwseisComponent } from './anakoinwseis.component';

describe('AnakoinwseisComponent', () => {
  let component: AnakoinwseisComponent;
  let fixture: ComponentFixture<AnakoinwseisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnakoinwseisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnakoinwseisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
