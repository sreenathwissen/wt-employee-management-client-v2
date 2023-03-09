import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { apiList } from 'src/app/services/https/api-list';
import { HttpsService } from 'src/app/services/https/https.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dob: ['', Validators.required],
    email: ['', Validators.required],
    phoneNo: ['', Validators.required],
    emergencyContact: ['', Validators.required],
    bloodGroup: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    employeeId: ['', Validators.required],
    experience: ['', Validators.required],
    manager: ['', Validators.required],
    designation: ['', Validators.required],
    role: ['', Validators.required],
    type: ['', Validators.required]
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
    permanentPinCode: ['', Validators.required]
  });

  constructor(
    private router: Router,
    private https: HttpsService,
    private apiList: apiList,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  sameAddress(thirdFormGroup: FormGroup) {
    thirdFormGroup.get('permanentFlat')?.setValue(thirdFormGroup.value.currentFlat);
    thirdFormGroup.get('permanentStreet')?.setValue(thirdFormGroup.value.currentStreet);
    thirdFormGroup.get('permanentCity')?.setValue(thirdFormGroup.value.currentCity);
    thirdFormGroup.get('permanentState')?.setValue(thirdFormGroup.value.currentState);
    thirdFormGroup.get('permanentPinCode')?.setValue(thirdFormGroup.value.currentPinCode);
  }

  save(firstFormGroup: FormGroup, secondFormGroup: FormGroup, thirdFormGroup: FormGroup) {
    let sendData = [
      {
        addressDTOList: [
          {
            addressId: 0,
            addressType: '',
            city: thirdFormGroup.value.currentCity,
            country: '',
            employeeId: 0,
            flatNo: thirdFormGroup.value.currentFlat,
            pincode: thirdFormGroup.value.currentPinCode,
            state: thirdFormGroup.value.currentState,
            street: thirdFormGroup.value.currentStreet,
          },
        ],
        bloodGroup: firstFormGroup.value.bloodGroup,
        departmentDTO: {
          depId: 0,
          depName: '',
        },
        designationDTO: {
          desgId: 0,
          desgName: secondFormGroup.value.designation,
        },
        dob: firstFormGroup.value.dob,
        doj: '',
        email: firstFormGroup.value.email,
        employeeAccountDTO: {
          pan: '',
          pfNo: '',
          uan: '',
        },
        employeeId: 0,
        employeeSkillDTOList: [
          {
            levels: 0,
            skillId: 0,
            skillName: 'Java',
          },
        ],
        exitDate: '',
        expDoj: secondFormGroup.value.experience,
        firstName: firstFormGroup.value.firstName,
        gender: '',
        joiningLocation: '',
        lastName: firstFormGroup.value.lastName,
        manager: secondFormGroup.value.manager,
        maritalStatusDate: '',
        primaryEmergencyContactNumber: firstFormGroup.value.emergencyContact,
        primaryPhoneNumber: 0,
        roleDTO: {
          roleId: 0,
          roleName: secondFormGroup.value.role,
        },
        secondaryEmergencyContactNumber: 0,
        secondaryPhoneNumber: 0,
        status: '',
        type: secondFormGroup.value.type,
        workPhone: firstFormGroup.value.phoneNo,
      },
    ];
    this.https
      .httpPostWithHeader(this.apiList.createEmployee, sendData)
      .subscribe((res: any) => {
        let employees: any[] = [];

        employees = res;
        localStorage.setItem('employees', JSON.stringify(employees));
        this.router.navigateByUrl('/employee');
      });
  }
}
