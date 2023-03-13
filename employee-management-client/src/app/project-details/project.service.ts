import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IClient } from '../client-details/IClient';
import { IProject } from '../project-details/IProject';
import { ISkill } from '../skill-details/ISkill';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projectUrl = 'http://localhost:8080/api/project';
  projectList!: IProject[];
  projectListForFilter!: IProject[];

  defaultClient: IClient = {
    clientId: 0,
    clientLocation: '',
    clientName: '',
  };
  constructor(private _http: HttpClient) {}

  form: FormGroup = new FormGroup({
    projectId: new FormControl(0, Validators.required),
    projectName: new FormControl('', Validators.required),
    projectLocation: new FormControl('', Validators.required),
    projectLead: new FormControl('', Validators.required),
    projectType: new FormControl('', Validators.required),
    client: new FormControl(this.defaultClient, Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
      projectId: 0,
      projectName: '',
      projectLocation: '',
      projectLead: '',
      projectType: '',
      client: this.defaultClient,
    });
  }

  getProjectData(): Observable<IProject[]> {
    return this._http.get<IProject[]>(this.projectUrl + '/allProjects');
  }

  searchProjectData(searchPattern: String): Observable<IProject[]> {
    return this._http.get<IProject[]>(
      this.projectUrl + '/search?projectName=' + searchPattern
    );
  }

  insertProject(project: IProject) {
    console.log(project);
    let projectArray = [];
    projectArray.push(project);
    console.log(projectArray);
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(projectArray);
    console.log(body);
    return this._http.post(this.projectUrl, body, { headers: headers });
  }

  populateForm(project: IProject) {
    this.form.setValue(project);
  }
}
