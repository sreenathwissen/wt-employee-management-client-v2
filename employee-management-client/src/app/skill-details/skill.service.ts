import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ISkill } from './ISkill';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  constructor(private _http: HttpClient) {}

  skillList!: ISkill[];

  form: FormGroup = new FormGroup({
    skillId: new FormControl(0, Validators.required),
    skillName: new FormControl('', Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
      skillId: 0,
      skillName: '',
    });
  }

  getSkillData(): Observable<ISkill[]> {
    return this._http.get<ISkill[]>('http://localhost:8080/api/skill');
  }

  insertSkill(skill: ISkill) {
    console.log(skill);
    let skillArray = [];
    skillArray.push(skill);
    console.log(skillArray);

    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(skillArray);
    console.log(body);
    return this._http.post('http://localhost:8080/api/skill', body, {
      headers: headers,
    });
  }

  populateForm(skill: ISkill) {
    this.form.setValue(skill);
  }
}
