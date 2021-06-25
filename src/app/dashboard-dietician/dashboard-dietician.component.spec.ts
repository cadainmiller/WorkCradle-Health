import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDieticianComponent } from './dashboard-dietician.component';

describe('DashboardDieticianComponent', () => {
  let component: DashboardDieticianComponent;
  let fixture: ComponentFixture<DashboardDieticianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardDieticianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDieticianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
