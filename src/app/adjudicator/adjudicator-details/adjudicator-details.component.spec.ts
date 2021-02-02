import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjudicatorDetailsComponent } from './adjudicator-details.component';

describe('AdjudicatorDetailsComponent', () => {
  let component: AdjudicatorDetailsComponent;
  let fixture: ComponentFixture<AdjudicatorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdjudicatorDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjudicatorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
