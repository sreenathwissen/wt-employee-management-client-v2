import { Injectable } from '@angular/core';

@Injectable()
export class apiList {
  getEmployees: string = 'api/employee/employees';
  getEmployee: string = 'api/employee/employee';
  createEmployee: string = 'api/employee/saveEmployeeDetails';
}
