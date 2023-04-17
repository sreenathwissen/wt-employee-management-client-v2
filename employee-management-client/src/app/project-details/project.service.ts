import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IClient } from '../client-details/IClient';
import { IProject } from '../project-details/IProject';
import { Constants } from '../shared/constants/Constants';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projectList!: IProject[];
  projectListForFilter!: IProject[];

  defaultClient: IClient = {
    clientId: 0,
    clientLocation: '',
    clientName: '',
  };
  constructor(private _http: HttpClient) { }

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
    return this._http.get<IProject[]>(Constants.BASE_URL + Constants.PROJECT_URL + Constants.ALL_PROJECTS);
  }

  searchProjectData(searchPattern: String): Observable<IProject[]> {
    return this._http.get<IProject[]>(
      Constants.BASE_URL + Constants.PROJECT_URL + Constants.SEARCH_PROJECTS + searchPattern
    );
  }

  insertProject(project: IProject) {
    let projectArray = [];
    projectArray.push(project);
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(projectArray);
    return this._http.post(Constants.BASE_URL + Constants.PROJECT_URL, body, { headers: headers });
  }

  populateForm(project: IProject) {
    this.form.setValue(project);
  }
}
