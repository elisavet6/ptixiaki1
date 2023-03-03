import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadanakonwsiComponent } from './uploadanakonwsi.component';

describe('UploadanakonwsiComponent', () => {
  let component: UploadanakonwsiComponent;
  let fixture: ComponentFixture<UploadanakonwsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadanakonwsiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadanakonwsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
