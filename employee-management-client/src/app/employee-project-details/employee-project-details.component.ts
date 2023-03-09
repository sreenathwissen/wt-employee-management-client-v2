import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeProjectService } from './EmployeeProjectService';
import { IEmployeeProject } from './IEmployeeProject';

@Component({
  selector: 'app-employee-project-details',
  templateUrl: './employee-project-details.component.html',
  styleUrls: ['./employee-project-details.component.scss']
})
export class EmployeeProjectDetailsComponent implements OnInit {

  listData!: MatTableDataSource<any>;
  displayedColumns: string[] = ['employeeId', 'projectName', 'projectLocation', 'projectLead', 'projectType', 'dojOnboarding', 'dorOnboarding', 'clientName', 'clientLocation'];
  rowData: IEmployeeProject[] = []
  isListEnable: boolean = false;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;


  constructor(public employeeProjectService: EmployeeProjectService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.employeeProjectService.form.valid) {
      console.log(this.employeeProjectService.form.value)
      this.employeeProjectService.getEmployeeProjectData(this.employeeProjectService.form.value.employeeId).subscribe(data => {

        console.log(data);
        this.rowData = data
        this.listData = new MatTableDataSource(this.rowData);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.isListEnable = true
      });
    }
  }
}
