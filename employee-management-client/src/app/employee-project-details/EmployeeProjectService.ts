import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IEmployeeProjectForm } from './employee-project-form/IEmployeeProjectForm';
import { IEmployeeProject } from './IEmployeeProject';

@Injectable({
    providedIn: 'root'
})
export class EmployeeProjectService {

    constructor(private _http: HttpClient) { }

    private empProjectUrl = 'http://localhost:8080/api/project/projectEmployeeMapping?';

    empProjectList!: IEmployeeProjectForm[];

    form: FormGroup = new FormGroup({
        employeeId: new FormControl('', [Validators.required, Validators.pattern('^[1-9]\\d*$')]),
    });

    employeeProjectForm: FormGroup = new FormGroup({
        employeeId: new FormControl('', [Validators.required, Validators.pattern('^[1-9]\\d*$')]),
        projectId: new FormControl('', [Validators.required]),
        dor: new FormControl(''),
        doj: new FormControl('', [Validators.required]),
    })

    initializeFormGroup() {
        this.form.setValue({
            employeeId: ''
        });
    }

    getEmployeeProjectData(employeeId: String): Observable<IEmployeeProject[]> {
        return this._http.get<IEmployeeProject[]>('http://localhost:8080/api/project/employee?empId=' + employeeId);

    }

    insertEmpProj(empProj: IEmployeeProjectForm) {
        console.log(empProj);
        let empProjArray = [];
        empProjArray.push(empProj);
        console.log(empProjArray);
        const headers = { 'content-type': 'application/json' };
        let dor = empProj.dor === null ? null : this.format(new Date(empProj.dor))
        let doj = this.format(new Date(empProj.doj))
        let url = this.empProjectUrl + "projectId=" + empProj.projectId + "&employeeId=" + empProj.employeeId + "&doj=" + doj
        if (dor !== null) {
            url = url + "&dor=" + dor
        }

        console.log(url);
        return this._http.post(url, {
            headers: headers,
        });
    }

    populateForm(empProj: IEmployeeProjectForm) {
        this.employeeProjectForm.setValue(empProj);
    }

    format(date: any): string {

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return year + '-' + this._to2digit(month) + '-' + this._to2digit(day);
    }

    private _to2digit(n: number) {
        return ('00' + n).slice(-2);
    }
}