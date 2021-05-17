import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavRoutingComponent } from './sidenav-routing.component';

describe('SidenavRoutingComponent', () => {
  let component: SidenavRoutingComponent;
  let fixture: ComponentFixture<SidenavRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavRoutingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
