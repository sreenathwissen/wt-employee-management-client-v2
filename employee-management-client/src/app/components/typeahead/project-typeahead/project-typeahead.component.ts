import { Component, OnInit } from '@angular/core';
import { IClient } from 'src/app/client-details/IClient';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-typeahead',
  templateUrl: './project-typeahead.component.html',
  styleUrls: ['./project-typeahead.component.scss']
})
export class ProjectTypeaheadComponent implements OnInit {

  selected?: ProjectTypeahead;
  dropDownList?: ProjectTypeahead[];
  dropDown?: boolean;
  searchString?: string;

  constructor(private projectServices: ProjectService) { /* TODO document why this constructor is empty */  }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
    this.selected = undefined;
    this.dropDownList = [];
    this.dropDown = false;
    this.searchString = '';
  }

  onTypeaheadChanged(event: string) {
    this.projectServices.getByQuery(event).subscribe((x: ProjectTypeahead[])=>{
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

  onDropDownItemClick(project:ProjectTypeahead) {
    this.selected = project;
    this.searchString = this.selected.projectName + ' (' + this.selected.projectLocation + ') - [ '
      + this.selected.client.clientName + ' (' + this.selected.client.clientLocation + ') ]';
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

export interface ProjectTypeahead {
  projectId: number;
  projectName: string;
  projectLocation: string;
  projectLead: string;
  projectType: string;
  client: IClient;
}
