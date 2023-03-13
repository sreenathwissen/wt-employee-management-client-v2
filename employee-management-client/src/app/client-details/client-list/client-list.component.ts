import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClientFormComponent } from '../client-form/client-form.component';
import { ClientService } from '../client.service';
import { IClient } from '../IClient';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {
  constructor(public service: ClientService, private dialog: MatDialog) {}
  listData!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'clientId',
    'clientName',
    'clientLocation',
    'actions',
  ];
  rowdata: IClient[] = [];

  dataSource!: MatTableDataSource<ClientFormComponent>;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @Input() set projects(value: ClientFormComponent[]) {
    this.dataSource = new MatTableDataSource(value);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  searchKey!: string;

  ngOnInit() {
    this.service.getClientData().subscribe((list) => {
      console.log(list);
      this.service.clientList = list;
      this.service.clientListForFilter = list;
      this.rowdata = list;
      this.listData = new MatTableDataSource(this.rowdata);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.service.clientListForFilter = this.service.clientList;
    this.applyFilter();
  }

  applyFilter() {
    this.service.clientListForFilter = this.service.clientList.filter(
      ({ clientName }: any) =>
        clientName.toLowerCase().indexOf(this.searchKey.trim().toLowerCase()) !== -1
    );
  }

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ClientFormComponent, dialogConfig);
  }

  onEdit(row: any) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ClientFormComponent, dialogConfig);
  }
}
