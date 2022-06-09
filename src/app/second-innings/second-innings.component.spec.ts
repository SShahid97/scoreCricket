import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondInningsComponent } from './second-innings.component';

describe('SecondInningsComponent', () => {
  let component: SecondInningsComponent;
  let fixture: ComponentFixture<SecondInningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondInningsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondInningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
