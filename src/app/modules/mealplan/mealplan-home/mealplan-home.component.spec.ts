import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealplanHomeComponent } from './mealplan-home.component';

describe('MealplanHomeComponent', () => {
  let component: MealplanHomeComponent;
  let fixture: ComponentFixture<MealplanHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealplanHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealplanHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
