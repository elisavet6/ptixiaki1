import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathimaComponent } from './mathima.component';

describe('MathimaComponent', () => {
  let component: MathimaComponent;
  let fixture: ComponentFixture<MathimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MathimaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MathimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
