import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SkillService } from 'src/app/shared/skill.service';
import { SkillComponent } from '../skill/skill.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent implements OnInit {

  constructor(private service: SkillService,
    private dialog: MatDialog) {

  }
  ngOnInit() {
    this.service.getSkillData().subscribe(
      list => {
        console.log(list)
        this.rowdata = list
        this.listData = new MatTableDataSource(this.rowdata);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }
    );
  }

  listData!: MatTableDataSource<any>;
  displayedColumns: string[] = ['skillId', 'skillName', 'actions'];
  rowdata: any

  dataSource!: MatTableDataSource<SkillComponent>;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;


  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  @Input() set projects(value: SkillComponent[]) {
    this.dataSource = new MatTableDataSource(value);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  searchKey!: string;

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
    this.dialog.open(SkillComponent, dialogConfig);
  }

  onEdit(row: any) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(SkillComponent, dialogConfig);
  }

}