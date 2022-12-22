import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavmathimatosComponent } from './navmathimatos.component';

describe('NavmathimatosComponent', () => {
  let component: NavmathimatosComponent;
  let fixture: ComponentFixture<NavmathimatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavmathimatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavmathimatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
