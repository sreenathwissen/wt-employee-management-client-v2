import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-typeahead',
  templateUrl: './employee-typeahead.component.html',
  styleUrls: ['./employee-typeahead.component.scss']
})
export class EmployeeTypeaheadComponent implements OnInit {

  selected?: EmployeeTypeahead;
  dropDownList?: EmployeeTypeahead[];
  dropDown?: boolean;
  searchString?: string;
   /* TODO document why this constructor is empty */ 
  constructor(private employeeServices: EmployeeService ) { /* TODO document why this constructor is empty */  }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
    this.selected = undefined;
    this.dropDownList = [];
    this.dropDown = false;
    this.searchString = '';
  }

  onTypeaheadChanged(event: string) {
    this.employeeServices.getByQuery(event).subscribe((x: EmployeeTypeahead[])=>{
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

  onDropDownItemClick(employee:EmployeeTypeahead) {
    this.selected = employee;
    this.searchString = this.selected.name;
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

export interface EmployeeTypeahead {
  id: number;
  name: string;
}
