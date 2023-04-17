import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ISkill } from '../model/ISkill';
import { Constants } from '../shared/constants/Constants';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  constructor(private _http: HttpClient) {}

  skillList!: ISkill[];
  skillListForFilter!: ISkill[];

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
    return this._http.get<ISkill[]>(Constants.BASE_URL + Constants.SKILL_URL);
  }

  insertSkill(skill: ISkill) {
    let skillArray = [];
    skillArray.push(skill);
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(skillArray);
    return this._http.post(Constants.BASE_URL + Constants.SKILL_URL, body, {
      headers: headers,
    });
  }

  populateForm(skill: ISkill) {
    this.form.setValue(skill);
  }
}
