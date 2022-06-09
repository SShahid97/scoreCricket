import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstInningsComponent } from './first-innings.component';

describe('FirstInningsComponent', () => {
  let component: FirstInningsComponent;
  let fixture: ComponentFixture<FirstInningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstInningsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstInningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
