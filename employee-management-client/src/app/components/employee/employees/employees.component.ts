import { Component, OnInit } from '@angular/core';
import { HttpsService } from 'src/app/services/https/https.service';
import { apiList } from 'src/app/services/https/api-list';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees:any[]=[]
  constructor(private https: HttpsService, private apiList: apiList) { }

  ngOnInit(): void {
    this.https.httpGet(this.apiList.getEmployees).subscribe((res: any) => {
      this.employees = res
    })
    if(localStorage.getItem('employees')){
      this.employees.push(JSON.parse(localStorage.getItem('employees') || ''))
  }
  }

}
