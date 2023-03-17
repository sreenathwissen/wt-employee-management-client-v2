import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
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
  skills: string[] = [];
  @ViewChild('skillInput') skillInput!: ElementRef;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  firstFormGroup = this.employeeService.firstFormGroup;
  secondFormGroup = this.employeeService.secondFormGroup;
  thirdFormGroup = this.employeeService.thirdFormGroup;

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

  save() {
    let sendData = [
      {
        addressDTOList: [
          {
            addressId: 0,
            addressType: '',
            city: this.thirdFormGroup.value.currentCity,
            country: '',
            employeeId: this.secondFormGroup.value.employeeId,
            flatNo: this.thirdFormGroup.value.currentFlat,
            pincode: this.thirdFormGroup.value.currentPinCode,
            state: this.thirdFormGroup.value.currentState,
            street: this.thirdFormGroup.value.currentStreet,
          },
        ],
        bloodGroup: this.firstFormGroup.value.bloodGroup,
        departmentDTO: {
          depId: 0,
          depName: '',
        },
        designationDTO: {
          desgId: 0,
          desgName: this.secondFormGroup.value.designation,
        },
        dob: this.firstFormGroup.value.dob,
        doj: '',
        email: this.firstFormGroup.value.email,
        employeeAccountDTO: {
          pan: '',
          pfNo: '',
          uan: '',
        },
        employeeId: this.secondFormGroup.value.employeeId,
        employeeSkillDTOList: [] as {
          levels: number;
          skillId: any;
          skillName: string;
        }[],
        exitDate: '',
        expDoj: this.secondFormGroup.value.experience,
        firstName: this.firstFormGroup.value.firstName,
        gender: '',
        joiningLocation: '',
        lastName: this.firstFormGroup.value.lastName,
        manager: this.secondFormGroup.value.manager,
        maritalStatusDate: '',
        primaryEmergencyContactNumber:
          this.firstFormGroup.value.emergencyContact,
        primaryPhoneNumber: 0,
        roleDTO: {
          roleId: 0,
          roleName: this.secondFormGroup.value.role,
        },
        secondaryEmergencyContactNumber: 0,
        secondaryPhoneNumber: 0,
        status: '',
        type: this.secondFormGroup.value.type,
        workPhone: this.firstFormGroup.value.phoneNo,
      },
    ];
    this.skills.forEach((skill) => {
      sendData[0].employeeSkillDTOList.push({
        levels: 0,
        skillId: this.service.skillList.find((s) => s.skillName === skill)
          ?.skillId,
        skillName: skill,
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
