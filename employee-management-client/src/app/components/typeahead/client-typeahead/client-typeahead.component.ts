import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/client-details/client.service';

@Component({
  selector: 'app-client-typeahead',
  templateUrl: './client-typeahead.component.html',
  styleUrls: ['./client-typeahead.component.scss']
})
export class ClientTypeaheadComponent implements OnInit {

  selected?: ClientTypeahead;
  dropDownList?: ClientTypeahead[];
  dropDown?: boolean;
  searchString?: string;

  constructor(private clientServices: ClientService) { /* TODO document why this constructor is empty */  }

  ngOnInit(): void {
    this.selected = undefined;
    this.dropDownList = [];
    this.dropDown = false;
    this.searchString = '';
  }

  onTypeaheadChanged(event: string) {
    this.clientServices.searchClientData(event).subscribe((x: ClientTypeahead[])=>{
      this.dropDownList = x;
      console.log(this.dropDownList);
      if(this.searchString?.length === 0) {
        this.dropDownList = [];
      }
      if(this.dropDownList.length !== 0) {
        this.dropDown = true;
      } else {
        this.dropDown = false;
      }
    });
  }

  onDropDownItemClick(client:ClientTypeahead) {
    this.selected = client;
    this.searchString = this.selected.clientName + ' (' + this.selected.clientLocation + ')';
    this.dropDownList = [];
    this.dropDown = false;
  }

  onClearSelected() {
    this.selected = undefined;
    this.searchString = '';
    this.dropDownList = [];
    this.dropDown = false;
  }

}

export interface ClientTypeahead {
  clientId: number;
  clientName: string;
  clientLocation: string;
}
