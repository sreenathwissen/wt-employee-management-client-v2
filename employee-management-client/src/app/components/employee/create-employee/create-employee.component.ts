import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import { ISkill } from 'src/app/model/ISkill';
import { NotificationService } from 'src/app/notification-service/notification.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { apiList } from 'src/app/services/https/api-list';
import { HttpsService } from 'src/app/services/https/https.service';
import { SkillService } from 'src/app/services/skill.service';

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

  constructor(
    private https: HttpsService,
    private apiList: apiList,
    public service: SkillService,
    public dialogRef: MatDialogRef<CreateEmployeeComponent>,
    public employeeService: EmployeeService,
    public notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.service.getSkillData().subscribe((list) => {
      this.service.skillList = [...list];
      this.service.skillListForFilter = list;
      this.sortSkillList();
    });
    this.ratingStarArr = Array(5).fill(0);
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
      skillName: event.option.viewValue, levels: 0, skillId: 0
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
    let data = this.selectedSkills.filter((skillData: ISkill) => skillData.skillName === skill)?.[0];
    data.levels = index + 1;
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
    thirdFormGroup
      .get('permanentCountry')
      ?.setValue(thirdFormGroup.value.currentCountry);
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
            employeeId: this.secondFormGroup.value.employeeId,
            flatNo: this.thirdFormGroup.value.currentFlat,
            pincode: this.thirdFormGroup.value.currentPinCode,
            state: this.thirdFormGroup.value.currentState,
            street: this.thirdFormGroup.value.currentStreet,
          },
          {
            addressId: 0,
            addressType: 'permanent',
            city: this.thirdFormGroup.value.permanentCity,
            country: this.thirdFormGroup.value.permanentCountry,
            employeeId: this.secondFormGroup.value.employeeId,
            flatNo: this.thirdFormGroup.value.permanentFlat,
            pincode: this.thirdFormGroup.value.permanentPinCode,
            state: this.thirdFormGroup.value.permanentState,
            street: this.thirdFormGroup.value.permanentStreet,
          },
        ],
        bloodGroup: this.firstFormGroup.value.bloodGroup,
        departmentDTO: {
          depId: 0,
          depName: this.secondFormGroup.value.department,
        },
        designationDTO: {
          desgId: 0,
          desgName: this.secondFormGroup.value.designation,
        },
        dob: this.firstFormGroup.value.dob,
        doj: this.secondFormGroup.value.doj,
        email: this.firstFormGroup.value.email,
        employeeAccountDTO: {
          pan: this.secondFormGroup.value.pan,
          pfNo: this.secondFormGroup.value.pfNo,
          uan: this.secondFormGroup.value.uan,
        },
        employeeId: this.secondFormGroup.value.employeeId,
        employeeSkillDTOList: [] as ISkill[],
        exitDate: this.secondFormGroup.value.exitDate,
        expDoj: this.employeeService.calcExp(this.secondFormGroup.value.doj),
        firstName: this.firstFormGroup.value.firstName,
        gender: this.firstFormGroup.value.gender,
        joiningLocation: this.secondFormGroup.value.joiningLocation,
        lastName: this.firstFormGroup.value.lastName,
        manager: this.secondFormGroup.value.manager,
        maritalStatusDate: this.firstFormGroup.value.maritalStatusDate,
        primaryEmergencyContactNumber:
          this.firstFormGroup.value.primaryEmergencyContactNumber,
        primaryPhoneNumber: this.firstFormGroup.value.primaryPhoneNumber,
        roleDTO: {
          roleId: 0,
          roleName: this.secondFormGroup.value.role,
        },
        secondaryEmergencyContactNumber:
          this.firstFormGroup.value.secondaryEmergencyContactNumber,
        secondaryPhoneNumber: 0,
        status: this.firstFormGroup.value.status,
        type: this.secondFormGroup.value.type,
        workPhone: this.firstFormGroup.value.workPhone,
      },
    ];
    this.selectedSkills.forEach((skill) => {
      sendData[0].employeeSkillDTOList.push({
        levels: skill.levels,
        skillId: this.service.skillList.filter((s) => s.skillName === skill.skillName)[0]?.skillId,
        skillName: skill.skillName,
      });
    });
    let found: boolean;
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
          this.dialogRef.close(false);
        }
      );
  }
}
