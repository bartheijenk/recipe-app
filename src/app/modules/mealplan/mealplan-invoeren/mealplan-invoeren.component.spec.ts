import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealplanInvoerenComponent } from './mealplan-invoeren.component';

describe('MealplanInvoerenComponent', () => {
  let component: MealplanInvoerenComponent;
  let fixture: ComponentFixture<MealplanInvoerenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealplanInvoerenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealplanInvoerenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
