import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees:any[]=[]
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('employees')){
      this.employees = JSON.parse(localStorage.getItem('employees') || '')
  }
  }

}
