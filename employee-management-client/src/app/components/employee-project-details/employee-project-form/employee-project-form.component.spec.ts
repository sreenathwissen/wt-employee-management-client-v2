import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProjectFormComponent } from './employee-project-form.component';

describe('EmployeeProjectFormComponent', () => {
  let component: EmployeeProjectFormComponent;
  let fixture: ComponentFixture<EmployeeProjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeProjectFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
