import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateViewComponent } from './admin-create-view.component';

describe('AdminCreateViewComponent', () => {
  let component: AdminCreateViewComponent;
  let fixture: ComponentFixture<AdminCreateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
