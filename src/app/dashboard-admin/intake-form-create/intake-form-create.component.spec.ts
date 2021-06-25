import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeFormCreateComponent } from './intake-form-create.component';

describe('IntakeFormCreateComponent', () => {
  let component: IntakeFormCreateComponent;
  let fixture: ComponentFixture<IntakeFormCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntakeFormCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakeFormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
