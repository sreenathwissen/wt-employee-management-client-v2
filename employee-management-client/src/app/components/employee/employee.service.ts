import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IEmployee } from '../IEmployee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _formBuilder: FormBuilder) {}

  employeeList!: IEmployee[];
  employeeListForFilter!: IEmployee[];

  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dob: ['', Validators.required],
    email: ['', Validators.required],
    phoneNo: ['', Validators.required],
    emergencyContact: ['', Validators.required],
    bloodGroup: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    employeeId: ['', Validators.required],
    experience: ['', Validators.required],
    manager: ['', Validators.required],
    designation: ['', Validators.required],
    role: ['', Validators.required],
    type: ['', Validators.required],
    skillTypeahead: [''],
  });

  thirdFormGroup = this._formBuilder.group({
    currentFlat: ['', Validators.required],
    currentStreet: ['', Validators.required],
    currentCity: ['', Validators.required],
    currentState: ['', Validators.required],
    currentPinCode: ['', Validators.required],
    permanentFlat: ['', Validators.required],
    permanentStreet: ['', Validators.required],
    permanentCity: ['', Validators.required],
    permanentState: ['', Validators.required],
    permanentPinCode: ['', Validators.required],
  });
}
