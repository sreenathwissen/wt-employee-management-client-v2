import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { apiList } from 'src/app/services/https/api-list';
import { HttpsService } from 'src/app/services/https/https.service';
import { ISkill } from 'src/app/skill-details/ISkill';
import { SkillService } from 'src/app/skill-details/skill.service';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit {
  skills: string[] = [];
  @ViewChild('skillInput') skillInput!: ElementRef;
  separatorKeysCodes: number[] = [ENTER, COMMA];
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

  constructor(
    private router: Router,
    private https: HttpsService,
    private apiList: apiList,
    private _formBuilder: FormBuilder,
    public service: SkillService
  ) {}

  ngOnInit(): void {
    this.service.getSkillData().subscribe((list) => {
      this.service.skillList = list;
      this.service.skillListForFilter = list;
    });
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills.splice(index, 1);
    }
    const foundSkill = this.service.skillList.find(
      (tskill) =>
        tskill.skillName === skill && this.skills.indexOf(skill) === -1
    );
    foundSkill && this.service.skillListForFilter.push(foundSkill);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(event.option.viewValue);
    this.skillInput.nativeElement.value = '';
    this.secondFormGroup.get('skillTypeahead')?.setValue(null);
    this.service.skillListForFilter = this.service.skillList.filter(
      (skill) => skill.skillName !== event.option.viewValue
    );
  }

  sameAddress(thirdFormGroup: FormGroup) {
    thirdFormGroup
      .get('permanentFlat')
      ?.setValue(thirdFormGroup.value.currentFlat);
    thirdFormGroup
      .get('permanentStreet')
      ?.setValue(thirdFormGroup.value.currentStreet);
    thirdFormGroup
      .get('permanentCity')
      ?.setValue(thirdFormGroup.value.currentCity);
    thirdFormGroup
      .get('permanentState')
      ?.setValue(thirdFormGroup.value.currentState);
    thirdFormGroup
      .get('permanentPinCode')
      ?.setValue(thirdFormGroup.value.currentPinCode);
  }

  save(
    firstFormGroup: FormGroup,
    secondFormGroup: FormGroup,
    thirdFormGroup: FormGroup
  ) {
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
        employeeSkillDTOList: [] as {levels:number,skillId:any,skillName:string}[],
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
    this.skills.forEach((skill) => {
      sendData[0].employeeSkillDTOList.push({
        levels: 0,
        skillId: this.service.skillList.find(s => s.skillName === skill)?.skillId,
        skillName: skill
      });
    });
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
