import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private _http: HttpClient) { }

  form: FormGroup = new FormGroup({
    skillId: new FormControl(0, Validators.required),
    skillName: new FormControl('', Validators.required)
  });

  initializeFormGroup() {
    this.form.setValue({
      skillId: 0,
      skillName: ''
    });
  }

  getSkillData() {
    return this._http.get('http://localhost:8080/api/skill');

  }

  insertSkill(skill: any) {
    console.log(skill);
    let skillArray = []
    skillArray.push(skill);
    console.log(skillArray);

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(skillArray);
    console.log(body)
    return this._http.post("http://localhost:8080/api/skill", body, { 'headers': headers })
  }

  populateForm(skill: any) {
    this.form.setValue(skill);
  }
}

