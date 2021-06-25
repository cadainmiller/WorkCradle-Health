import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietitiansComponent } from './dietitians.component';

describe('DietitiansComponent', () => {
  let component: DietitiansComponent;
  let fixture: ComponentFixture<DietitiansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietitiansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietitiansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
