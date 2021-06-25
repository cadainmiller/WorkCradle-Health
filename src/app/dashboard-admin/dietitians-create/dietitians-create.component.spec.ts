import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietitiansCreateComponent } from './dietitians-create.component';

describe('DietitiansCreateComponent', () => {
  let component: DietitiansCreateComponent;
  let fixture: ComponentFixture<DietitiansCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietitiansCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietitiansCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
