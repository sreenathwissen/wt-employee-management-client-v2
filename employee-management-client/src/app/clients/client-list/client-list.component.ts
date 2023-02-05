import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from 'src/app/shared/client.service';
import { ClientComponent } from '../client/client.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  constructor(private service: ClientService,
    private dialog: MatDialog) {

  }
  listData!: MatTableDataSource<any>;
  displayedColumns: string[] = ['clientId', 'clientName', 'clientLocation', 'actions'];
  rowdata: any

  // @ViewChild(MatSort)
  // sort!: MatSort;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<ClientComponent>;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;


  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @Input() set projects(value: ClientComponent[]) {
    this.dataSource = new MatTableDataSource(value);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  searchKey!: string;

  ngOnInit() {
    this.service.getClientData().subscribe(
      list => {
        console.log(list)
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
    this.dialog.open(ClientComponent, dialogConfig);
  }

  onEdit(row: any) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(ClientComponent, dialogConfig);
  }

}
