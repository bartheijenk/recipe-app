import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptenComponent } from './recepten.component';

describe('ReceptenComponent', () => {
  let component: ReceptenComponent;
  let fixture: ComponentFixture<ReceptenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
