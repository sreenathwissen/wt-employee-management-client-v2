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
    workPhone: [''],
    primaryEmergencyContactNumber: ['', Validators.required],
    bloodGroup: ['', Validators.required],
    gender: ['', Validators.required],
    status: ['', Validators.required],
    maritalStatusDate: [''],
    secondaryEmergencyContactNumber: [''],
    primaryPhoneNumber: ['', Validators.required],
    secondaryPhoneNumber: ['']
  });

  secondFormGroup = this._formBuilder.group({
    employeeId: ['0'],
    pan: ['', Validators.required],
    pfNo: ['', Validators.required],
    uan: ['', Validators.required],
    department: ['', Validators.required],
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
      dob: this.formatDateSelected(data.dob),
      email: data.email,
      primaryPhoneNumber: data.primaryPhoneNumber,
      secondaryPhoneNumber: data.secondaryPhoneNumber,
      workPhone: data.workPhone,
      primaryEmergencyContactNumber: data.primaryEmergencyContactNumber,
      secondaryEmergencyContactNumber: data.secondaryEmergencyContactNumber,
      bloodGroup: data.bloodGroup,
      gender: data.gender,
      status: data.status,
      maritalStatusDate: this.formatDateSelected(data.maritalStatusDate),
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
      doj: this.formatDateSelected(data.doj),
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

  public formatDateSelected(date: Date) {
    if(date) {
      return formatDate(date, 'yyyy-MM-dd', 'en');
    }
    return date;
  }
}
