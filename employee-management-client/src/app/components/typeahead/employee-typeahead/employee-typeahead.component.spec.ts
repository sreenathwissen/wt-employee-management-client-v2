import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTypeaheadComponent } from './employee-typeahead.component';

describe('EmployeeTypeaheadComponent', () => {
  let component: EmployeeTypeaheadComponent;
  let fixture: ComponentFixture<EmployeeTypeaheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTypeaheadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
