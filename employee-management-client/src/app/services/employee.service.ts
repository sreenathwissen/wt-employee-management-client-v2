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
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dob: ['', Validators.required],
    email: ['', Validators.required],
    workPhone: ['', Validators.required],
    primaryEmergencyContactNumber: ['', Validators.required],
    bloodGroup: ['', Validators.required],
    gender: ['', Validators.required],
    status: ['', Validators.required],
    maritalStatusDate: ['', Validators.required],
    secondaryEmergencyContactNumber: ['', Validators.required],
    primaryPhoneNumber: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    employeeId: ['0'],
    pan: ['', Validators.required],
    pfNo: ['', Validators.required],
    uan: ['', Validators.required],
    department: ['', Validators.required],
    exitDate: ['', Validators.required],
    joiningLocation: ['', Validators.required],
    doj: ['', Validators.required],
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
    currentCountry: ['', Validators.required],
    permanentFlat: ['', Validators.required],
    permanentStreet: ['', Validators.required],
    permanentCity: ['', Validators.required],
    permanentState: ['', Validators.required],
    permanentPinCode: ['', Validators.required],
    permanentCountry: ['', Validators.required],
  });

  public parseFirstObj(data: any) {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      dob: formatDate(data.dob, 'yyyy-MM-dd', 'en'),
      email: data.email,
      primaryPhoneNumber: data.primaryPhoneNumber,
      workPhone: data.workPhone,
      primaryEmergencyContactNumber: data.primaryEmergencyContactNumber,
      secondaryEmergencyContactNumber: data.secondaryEmergencyContactNumber,
      bloodGroup: data.bloodGroup,
      gender: data.gender,
      status: data.status,
      maritalStatusDate: formatDate(data.maritalStatusDate, 'yyyy-MM-dd', 'en'),
    };
  }

  public parseSecondObj(data: any) {
    return {
      employeeId: data.empId,
      manager: data.manager,
      designation: data.designation.desgName,
      role: data.role.roleName,
      type: data.type,
      pan: data.pan || '',
      pfNo: data.pfNo || '',
      uan: data.uan || '',
      exitDate: formatDate(data.exitDate, 'yyyy-MM-dd', 'en') || '',
      doj: formatDate(data.doj, 'yyyy-MM-dd', 'en'),
      department: data.department.depName,
      joiningLocation: data.joiningLocation,
      skillTypeahead: '',
    };
  }

  public calcExp(dateISO: string) {
    let seconds = Math.round(
      Math.abs(new Date().getTime() - new Date(dateISO).getTime()) / 1000
    );
    return (Math.floor(seconds / 86400) / 365).toFixed(2);
  }
}
