import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietitiansViewComponent } from './dietitians-view.component';

describe('DietitiansViewComponent', () => {
  let component: DietitiansViewComponent;
  let fixture: ComponentFixture<DietitiansViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietitiansViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietitiansViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
