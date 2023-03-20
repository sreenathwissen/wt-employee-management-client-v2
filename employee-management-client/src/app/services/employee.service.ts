import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IEmployee } from '../model/IEmployee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _formBuilder: FormBuilder) {}

  employeeList!: IEmployee[];
  employeeListForFilter!: IEmployee[];

  firstFormGroup = this._formBuilder.group({
    firstName: [''],
    lastName: [''],
    dob: [''],
    email: [''],
    phoneNo: [''],
    emergencyContact: [''],
    bloodGroup: [''],
  });

  secondFormGroup = this._formBuilder.group({
    employeeId: ['0'],
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

  public parseFirstObj(data: any) {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      dob: formatDate(data.dob, 'yyyy-MM-dd', 'en'),
      email: data.email,
      phoneNo: data.workPhone,
      emergencyContact: data.primaryEmergencyContactNumber,
      bloodGroup: data.bloodGroup,
    };
  }

  public parseSecondObj(data: any) {
    return {
      employeeId: data.empId,
      experience: data.expDoj,
      manager: data.manager,
      designation: data.designation.desgName,
      role: data.role.roleName,
      type: data.type,
      skillTypeahead: '',
    };
  }
}
