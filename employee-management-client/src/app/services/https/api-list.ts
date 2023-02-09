import { Injectable } from "@angular/core";

@Injectable()
export class apiList {

  getEmployees: string = "api/employee/getEmployeeDetails";
  createEmployee: string = "api/employee/saveEmployeeDetails";

}
