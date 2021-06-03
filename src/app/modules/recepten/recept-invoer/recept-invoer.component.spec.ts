import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptInvoerComponent } from './recept-invoer.component';

describe('ReceptInvoerComponent', () => {
  let component: ReceptInvoerComponent;
  let fixture: ComponentFixture<ReceptInvoerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptInvoerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptInvoerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
