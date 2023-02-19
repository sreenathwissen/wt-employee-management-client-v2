import { Injectable } from "@angular/core";

@Injectable()
export class apiList {

  getEmployees: string = "api/employee/employees";
  createEmployee: string = "api/employee/saveEmployeeDetails";

}
