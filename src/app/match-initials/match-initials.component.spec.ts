import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchInitialsComponent } from './match-initials.component';

describe('MatchInitialsComponent', () => {
  let component: MatchInitialsComponent;
  let fixture: ComponentFixture<MatchInitialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchInitialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchInitialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
