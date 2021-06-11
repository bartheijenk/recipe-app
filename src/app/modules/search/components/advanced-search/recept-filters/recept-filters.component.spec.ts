import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptFiltersComponent } from './recept-filters.component';

describe('ReceptFiltersComponent', () => {
  let component: ReceptFiltersComponent;
  let fixture: ComponentFixture<ReceptFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
