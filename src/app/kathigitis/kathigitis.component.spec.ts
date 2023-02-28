import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KathigitisComponent } from './kathigitis.component';

describe('KathigitisComponent', () => {
  let component: KathigitisComponent;
  let fixture: ComponentFixture<KathigitisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KathigitisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KathigitisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
