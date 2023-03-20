import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ISkill } from '../ISkill';
import { SkillFormComponent } from '../skill-form/skill-form.component';
import { SkillService } from '../skill.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss'],
})
export class SkillListComponent implements OnInit {
  listData!: MatTableDataSource<any>;
  displayedColumns: string[] = ['skillId', 'skillName', 'actions'];
  rowdata: ISkill[] = [];
  skillControl = new FormControl();
  filteredSkills!: Observable<ISkill[]>;
  // created public service so as to access in html
  constructor(public service: SkillService, private dialog: MatDialog) {}
  ngOnInit() {
    this.service.getSkillData().subscribe((list) => {
      console.log(list);
      this.service.skillList = list;
      this.rowdata = list;
      this.listData = new MatTableDataSource(this.rowdata);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.filteredSkills = this.skillControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
    });
  }

  dataSource!: MatTableDataSource<SkillFormComponent>;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  @Input() set projects(value: SkillFormComponent[]) {
    this.dataSource = new MatTableDataSource(value);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  searchKey!: string;

  private _filter(value: string): ISkill[] {
    const filterValue = value.toLowerCase();
    return this.rowdata.filter((option) =>
      option.skillName.toLowerCase().includes(filterValue)
    );
  }

  onSearchClear() {
    this.searchKey = '';
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
    dialogConfig.width = '60%';
    this.dialog.open(SkillFormComponent, dialogConfig);
  }

  onEdit(row: any) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(SkillFormComponent, dialogConfig);
  }

  displayFn(subject: any) {
    return subject ? subject.skillName : undefined;
  }
}
