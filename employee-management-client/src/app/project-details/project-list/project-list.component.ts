import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IProject } from '../IProject';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  constructor(public service: ProjectService,
    private dialog: MatDialog) { }

  listData!: MatTableDataSource<any>;
  displayedColumns: string[] = ['projectId', 'projectName', 'projectLocation', 'projectLead', 'projectType', 'client', 'actions'];
  rowdata: IProject[] = [];


  dataSource!: MatTableDataSource<ProjectFormComponent>;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;


  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @Input() set projects(value: ProjectFormComponent[]) {
    this.dataSource = new MatTableDataSource(value);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  searchKey!: string;

  ngOnInit() {
    this.service.getProjectData().subscribe(
      list => {
        console.log(list)
        this.service.projectList = list;
        this.rowdata = list
        this.listData = new MatTableDataSource(this.rowdata);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }
    );
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(ProjectFormComponent, dialogConfig);
  }

  onEdit(row: any) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(ProjectFormComponent, dialogConfig);
  }

}
