import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IEmployeeProject } from './IEmployeeProject';

@Injectable({
    providedIn: 'root'
})
export class EmployeeProjectService {

    constructor(private _http: HttpClient) { }

    form: FormGroup = new FormGroup({
        employeeId: new FormControl('', [Validators.required, Validators.pattern('^[1-9]\\d*$')]),
    });

    initializeFormGroup() {
        this.form.setValue({
            employeeId: ''
        });
    }

    getEmployeeProjectData(employeeId: String): Observable<IEmployeeProject[]> {
        return this._http.get<IEmployeeProject[]>('http://localhost:8080/api/project/employee?empId=' + employeeId);

    }


}