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

    private empProjectUrl = 'http://localhost:8080/api/project/projectEmployeeMapping';

    empProjectList!: IEmployeeProjectForm[];

    form: FormGroup = new FormGroup({
        employeeId: new FormControl('', [Validators.required, Validators.pattern('^[1-9]\\d*$')]),
    });

    employeeProjectForm: FormGroup = new FormGroup({
        employeeId: new FormControl('', [Validators.required, Validators.pattern('^[1-9]\\d*$')]),
        projectId: new FormControl('', [Validators.required]),
        dor: new FormControl(''),
        doj: new FormControl('', [Validators.required]),
        employeeProjectId: new FormControl(0, [Validators.required]),
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
        let dto = this.getEmployeeProjectDto(empProj)
        let empProjArray = [];
        empProjArray.push(dto);
        console.log("Saving" + empProjArray);
        const headers = { 'content-type': 'application/json' };
        const body = JSON.stringify(empProjArray);

        return this._http.post(this.empProjectUrl, body, {
            headers: headers
        });
    }

    populateForm(empProj: any) {
        this.employeeProjectForm.setValue({
            projectId: empProj.project.projectId,
            doj: empProj.dojOnboarding,
            dor: empProj.dorOnboarding,
            employeeId: empProj.employee.empId,
            employeeProjectId: empProj.employeeProjectId
        })
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

    private getEmployeeProjectDto(form: IEmployeeProjectForm) {
        const dto = {
            empId: form.employeeId,
            projectId: form.projectId,
            dojOnboarding: form.doj,
            dorOnboarding: form.dor,
            employeeProjectId: form.employeeProjectId
        }
        return dto;
    }
}