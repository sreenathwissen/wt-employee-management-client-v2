import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { apiList } from 'src/app/services/https/api-list';
import { HttpsService } from 'src/app/services/https/https.service';
import { IEmployee } from '../../IEmployee';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employees: IEmployee[] = [];
  displayedColumns: string[] = [
    'employeeId',
    'firstName',
    'lastName',
    'dob',
    'email',
    'primaryPhoneNumber',
    'primaryEmergencyContactNumber',
    'bloodGroup',
    'experience',
    'manager',
    'designation',
    'role',
    'type',
    'actions',
  ];
  searchKey!: string;

  constructor(
    private https: HttpsService,
    private apiList: apiList,
    private dialog: MatDialog,
    public service: EmployeeService
  ) {}

  ngOnInit(): void {
    this.https.httpGet(this.apiList.getEmployees).subscribe((res: any) => {
      this.employees = res;
      this.service.employeeList = res;
      this.service.employeeListForFilter = res;
    });
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CreateEmployeeComponent, dialogConfig);
  }

  onSearchClear() {
    this.searchKey = '';
    this.service.employeeListForFilter = this.service.employeeList;
    this.applyFilter();
  }

  applyFilter() {
    this.service.employeeListForFilter = this.service.employeeList.filter(
      ({ firstName, lastName }: any) =>
        (firstName + lastName)
          .toLowerCase()
          .indexOf(this.searchKey.trim().toLowerCase()) !== -1
    );
  }

  onEdit(row: any) {
    // this.service.firstFormGroup.setValue(row);
    // this.service.secondFormGroup.setValue(row);
    // this.service.thirdFormGroup.setValue(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CreateEmployeeComponent, dialogConfig);
    console.log(row);
  }
}
