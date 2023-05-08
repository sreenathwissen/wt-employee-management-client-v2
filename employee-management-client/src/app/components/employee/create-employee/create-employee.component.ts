import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { IDepartment, IDesignation, IManager, IRole } from 'src/app/model/IEmployee';
import { ISkill } from 'src/app/model/ISkill';
import { NotificationService } from 'src/app/notification-service/notification.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { apiList } from 'src/app/services/https/api-list';
import { HttpsService } from 'src/app/services/https/https.service';
import { SkillService } from 'src/app/services/skill.service';
import { Constants } from 'src/app/shared/constants/Constants';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit {
  selectedSkills: ISkill[] = [];
  @ViewChild('skillInput') skillInput!: ElementRef;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  firstFormGroup = this.employeeService.firstFormGroup;
  secondFormGroup = this.employeeService.secondFormGroup;
  thirdFormGroup = this.employeeService.thirdFormGroup;
  ratingStarArr: number[] = [];
  today!: Date;
  departmentList!: IDepartment[];
  roleList!: IRole[];
  managerList: string[] = [];
  designationList!: IDesignation[];
  empIdPrefix: string = 'WT';
  emailSuffix: string = '@wissen.com';
  isSameAddress = new FormControl(false);
  @ViewChild('autocomplete') autocomplete!: any;

  constructor(
    private https: HttpsService,
    private apiList: apiList,
    public service: SkillService,
    public dialogRef: MatDialogRef<CreateEmployeeComponent>,
    public employeeService: EmployeeService,
    public notificationService: NotificationService,
    public httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.getInitialData();
    this.ratingStarArr = Array(5).fill(0);
    this.today = new Date();
  }

  selectEvent(item: string) {
    this.secondFormGroup.get('manager')?.setValue(item);
  }

  onChangeSearch(val: string) {
    if(val.length >= 3) {
      this.httpClient.get<IManager[]>
      (Constants.BASE_URL + Constants.EMPLOYEE_URL + Constants.SEARCH_EMPLOYEE + val)
      .subscribe((response: any) => {
        this.managerList = response.responseData.map((res: IManager) => res.name);
      });
    } else {
      this.managerList = [];
    }
  }

  onCleared() {
    this.secondFormGroup.get('manager')?.setValue('');
    this.managerList = [];
    this.autocomplete.close();
  }

  getInitialData() {
    this.service.getSkillData().subscribe((list) => {
      this.service.skillList = [...list];
      this.service.skillListForFilter = list;
      this.sortSkillList();
    });
    this.httpClient.get<IDepartment[]>
    (Constants.BASE_URL + Constants.DEPARTMENT_URL + Constants.SEARCH_DEPARTMENT + 'IT')
    .subscribe((departmentList: IDepartment[]) => {
      this.departmentList = departmentList;
    });
    this.httpClient.get<IRole[]>
    (Constants.BASE_URL + Constants.ROLE_URL + Constants.ALL_ROLES)
    .subscribe((roleList: IRole[]) => {
      this.roleList = roleList;
    });
    this.httpClient.get<IDesignation[]>
    (Constants.BASE_URL + Constants.DESIGNATION_URL)
    .subscribe((designationList: IDesignation[]) => {
      this.designationList = designationList;
    });
  }

  remove(skill: ISkill): void {
    const index = this.selectedSkills.indexOf(skill);
    if (index >= 0) {
      this.selectedSkills.splice(index, 1);
    }
    const foundSkill = this.service.skillList.find(
      (tskill) => tskill.skillName === skill.skillName
    );
    foundSkill && this.service.skillListForFilter.push(foundSkill);
    this.sortSkillList();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedSkills.push({
      skillName: event.option.viewValue,
      levels: 0,
      skillId: 0,
    });
    const index = this.service.skillListForFilter.findIndex(
      (skill) => skill.skillName === event.option.viewValue
    );
    if (index !== -1) {
      this.service.skillListForFilter.splice(index, 1);
    }
    this.skillInput.nativeElement.value = '';
    this.skillInput.nativeElement.blur();
    this.sortSkillList();
    this.secondFormGroup.get('skillTypeahead')?.setValue(null);
  }

  sortSkillList() {
    this.service.skillListForFilter.sort(function (obj1: ISkill, obj2: ISkill) {
      if (obj1.skillName > obj2.skillName) {
        return 1;
      }
      if (obj1.skillName < obj2.skillName) {
        return -1;
      }
      return 0;
    });
  }

  pickRating(skill: string, index: number) {
    let data = this.selectedSkills.filter(
      (skillData: ISkill) => skillData.skillName === skill
    )?.[0];
    data.levels = index + 1;
  }

  setPermanentAddress(event: MatCheckboxChange, thirdFormGroup: FormGroup) {
    let permanentAddress = {};
    this.isSameAddress.setValue(event.checked);
    if(event.checked) {
      permanentAddress = {
        permanentFlat: thirdFormGroup.value.currentFlat,
        permanentStreet: thirdFormGroup.value.currentStreet,
        permanentCity: thirdFormGroup.value.currentCity,
        permanentState: thirdFormGroup.value.currentState,
        permanentPinCode: thirdFormGroup.value.currentPinCode,
        permanentCountry: thirdFormGroup.value.currentCountry
      }
      this.disablePermanentAdd();
    } else {
      this.thirdFormGroup.enable();
    }
    this.sameAddress(permanentAddress);
  }

  getCheckState() {
    return this.isSameAddress.value;
  }

  changePermanetAdd(controlName: string, event: any) {
    this.thirdFormGroup.controls[controlName].setValue(event.target.value);
  }

  disablePermanentAdd() {
    this.employeeService.permanentAddKeys.forEach((controlName) => {
      this.thirdFormGroup.controls[controlName].disable();
    });
  }

  sameAddress(permanentAddress: any) {
    this.employeeService.permanentAddKeys.forEach((controlName) => {
      this.thirdFormGroup.get(controlName)
      ?.setValue(permanentAddress[controlName]);
    });
  }

  onClose() {
    this.employeeService.firstFormGroup.reset();
    this.employeeService.secondFormGroup.reset();
    this.employeeService.thirdFormGroup.reset();
    this.dialogRef.close();
  }

  save() {
    let sendData = [
      {
        addressDTOList: [
          {
            addressId: 0,
            addressType: 'current',
            city: this.thirdFormGroup.value.currentCity,
            country: this.thirdFormGroup.value.currentCountry,
            employeeId: this.empIdPrefix + this.firstFormGroup.value.employeeId,
            flatNo: this.thirdFormGroup.value.currentFlat,
            pincode: this.thirdFormGroup.value.currentPinCode,
            state: this.thirdFormGroup.value.currentState,
            street: this.thirdFormGroup.value.currentStreet,
          },
          {
            addressId: 0,
            addressType: 'permanent',
            city: this.thirdFormGroup.getRawValue().permanentCity,
            country: this.thirdFormGroup.getRawValue().permanentCountry,
            employeeId: this.empIdPrefix + this.firstFormGroup.value.employeeId,
            flatNo: this.thirdFormGroup.getRawValue().permanentFlat,
            pincode: this.thirdFormGroup.getRawValue().permanentPinCode,
            state: this.thirdFormGroup.getRawValue().permanentState,
            street: this.thirdFormGroup.getRawValue().permanentStreet,
          },
        ],
        bloodGroup: this.firstFormGroup.value.bloodGroup,
        departmentDTO: {
          depId: this.departmentList.filter((data) => 
          data.depName === this.secondFormGroup.value.department)?.[0].depId,
          depName: this.secondFormGroup.value.department,
        },
        designationDTO: {
          desgId: this.designationList.filter((data) => 
          data.desgName === this.secondFormGroup.value.designation)?.[0].desgId,
          desgName: this.secondFormGroup.value.designation,
        },
        dob: this.employeeService.formatDateSelected(this.firstFormGroup.value.dob),
        doj: this.employeeService.formatDateSelected(this.secondFormGroup.value.doj),
        employeeId: this.empIdPrefix + this.firstFormGroup.value.employeeId,
        email: this.firstFormGroup.value.email + this.emailSuffix,
        employeeAccountDTO: {
          pan: this.secondFormGroup.value.pan,
          pfNo: this.secondFormGroup.value.pfNo,
          uan: this.secondFormGroup.value.uan,
        },
        employeeSkillDTOList: [] as ISkill[],
        expDoj: this.employeeService.calcExp(this.secondFormGroup.value.doj),
        firstName: this.firstFormGroup.value.firstName,
        gender: this.firstFormGroup.value.gender,
        joiningLocation: this.secondFormGroup.value.joiningLocation,
        lastName: this.firstFormGroup.value.lastName,
        manager: this.secondFormGroup.value.manager,
        maritalStatusDate: this.employeeService.formatDateSelected(this.firstFormGroup.value.maritalStatusDate),
        primaryEmergencyContactNumber:
          this.firstFormGroup.value.primaryEmergencyContactNumber,
        primaryPhoneNumber: this.firstFormGroup.value.primaryPhoneNumber,
        roleDTO: {
          roleId: this.roleList.filter((data) => 
          data.roleName === this.secondFormGroup.value.role)?.[0].roleId,
          roleName: this.secondFormGroup.value.role,
        },
        secondaryEmergencyContactNumber:
          this.firstFormGroup.value.secondaryEmergencyContactNumber,
        secondaryPhoneNumber: this.firstFormGroup.value.secondaryPhoneNumber,
        status: this.firstFormGroup.value.status,
        type: this.secondFormGroup.value.type,
        workPhone: this.firstFormGroup.value.workPhone,
      },
    ];
    this.selectedSkills.forEach((skill) => {
      sendData[0].employeeSkillDTOList.push({
        levels: skill.levels,
        skillId: this.service.skillList.filter(
          (s) => s.skillName === skill.skillName
        )[0]?.skillId,
        skillName: skill.skillName,
      });
    });
    let found: boolean;
    console.log("saveData:", sendData);
    this.https
      .httpPostWithHeader(this.apiList.createEmployee, sendData)
      .subscribe(
        (res: any) => {
          let data = res[0].employeeResponse;
          this.employeeService.employeeList.forEach((employee, index) => {
            if (employee.empId === data.empId) {
              this.employeeService.employeeList[index] = data;
              this.employeeService.employeeList = [
                ...this.employeeService.employeeList,
              ];
              found = true;
              this.notificationService.showSuccess(
                'Success',
                'Employee Updated Successfully'
              );
              this.dialogRef.close(true);
            }
          });
          if (!found) {
            this.notificationService.showSuccess(
              'Success',
              'Employee Added Successfully'
            );
            this.employeeService.employeeList = [
              ...this.employeeService.employeeList,
              data,
            ];
            this.dialogRef.close(true);
          }
          this.employeeService.employeeListForFilter = [
            ...this.employeeService.employeeList,
          ];
          this.employeeService.firstFormGroup.reset();
          this.employeeService.secondFormGroup.reset();
          this.employeeService.thirdFormGroup.reset();
        },
        () => {
          this.notificationService.showError('Failure', 'Employee not saved');
          return;
        }
      );
  }
}
