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
  permanentAddKeys = ['permanentFlat', 'permanentStreet', 'permanentCity', 
  'permanentState','permanentPinCode', 'permanentCountry'];

  firstFormGroup = this._formBuilder.group({
    firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    dob: ['', Validators.required],
    employeeId: ['', Validators.required],
    email: ['', Validators.required],
    workPhone: ['', Validators.pattern('^[0-9]+$')],
    primaryEmergencyContactNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    bloodGroup: ['', Validators.required],
    gender: ['', Validators.required],
    status: ['', Validators.required],
    maritalStatusDate: [''],
    secondaryEmergencyContactNumber: ['', Validators.pattern('^[0-9]+$')],
    primaryPhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    secondaryPhoneNumber: ['', Validators.pattern('^[0-9]+$')]
  });

  secondFormGroup = this._formBuilder.group({
    pan: [''],
    pfNo: [''],
    uan: [''],
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
    currentPinCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    currentCountry: ['', Validators.required],
    permanentFlat: ['', Validators.required],
    permanentStreet: ['', Validators.required],
    permanentCity: ['', Validators.required],
    permanentState: ['', Validators.required],
    permanentPinCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    permanentCountry: ['', Validators.required],
  });

  public parseFirstObj(data: any) {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      dob: this.formatDateSelected(data.dob),
      employeeId: data.empId,
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
