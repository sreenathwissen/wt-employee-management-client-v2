import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { map, startWith } from 'rxjs/operators';
import { IEmployee } from '../employee/employees/IEmployee';
import { EmployeeSearchService } from './employee-search.service';
import { IEmployeeSearch } from './IEmployeeSearch';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.scss'],
})
export class EmployeeSearchComponent {
  searchControl = new FormControl();
  filteredEmployees$: Observable<IEmployeeSearch[]> | undefined;
  selectedEmployee: IEmployeeSearch | undefined;

  constructor(private employeeService: EmployeeSearchService) {
    this.filteredEmployees$ = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchTerm) =>
        this.employeeService.searchEmployees(searchTerm)
      )
    );
    console.log(this.filteredEmployees$);
  }

  displayFn(employee: IEmployeeSearch): string {
    return employee ? `${employee.firstName} (${employee.empId})` : '';
  }

  selectEmployee(employee: IEmployeeSearch) {
    this.selectedEmployee = employee;
  }
}
