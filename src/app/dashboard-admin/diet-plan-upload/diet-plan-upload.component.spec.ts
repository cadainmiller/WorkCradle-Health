import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietPlanUploadComponent } from './diet-plan-upload.component';

describe('DietPlanUploadComponent', () => {
  let component: DietPlanUploadComponent;
  let fixture: ComponentFixture<DietPlanUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietPlanUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietPlanUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
