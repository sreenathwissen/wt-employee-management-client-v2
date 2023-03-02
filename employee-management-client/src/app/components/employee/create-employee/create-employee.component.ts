import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apiList } from 'src/app/services/https/api-list';
import { HttpsService } from 'src/app/services/https/https.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  selectedIndex: number = 0;
  data: {
    firstName: string,
    lastName: string,
    dob: string,
    email: string,
    phoneNo: string,
    emergencyContact: string,
    bloodGroup: string,
    employeeId: string,
    experience: number | null,
    manager: string,
    designation: string,
    role: string,
    type: string,
    currentFlat: string,
    currentStreet: string,
    currentCity: string,
    currentState: string,
    currentPinCode: number | null,
    permanentFlat: string,
    permanentStreet: string,
    permanentCity: string,
    permanentState: string,
    permanentPinCode: number | null,
  } = {
      firstName: '',
      lastName: '',
      dob: '',
      email: '',
      phoneNo: '',
      emergencyContact: '',
      bloodGroup: '',
      employeeId: '',
      experience: null,
      manager: '',
      designation: '',
      role: '',
      type: '',
      currentFlat: '',
      currentStreet: '',
      currentCity: '',
      currentState: '',
      currentPinCode: null,
      permanentFlat: '',
      permanentStreet: '',
      permanentCity: '',
      permanentState: '',
      permanentPinCode: null,
    }

  constructor(private router: Router, private https: HttpsService, private apiList: apiList) { }

  ngOnInit(): void {
  }

  sameAddress() {
    this.data.permanentFlat = this.data.currentFlat;
    this.data.permanentStreet = this.data.currentStreet;
    this.data.permanentCity = this.data.currentCity;
    this.data.permanentState = this.data.currentState;
    this.data.permanentPinCode = this.data.currentPinCode;
  }

  save() {
    console.log(this.data);
    let sendData = [
      {
        "addressDTOList": [
          {
            "addressId": 0,
            "addressType": "",
            "city": this.data.currentCity,
            "country": "",
            "employeeId": 0,
            "flatNo": this.data.currentFlat,
            "pincode": this.data.currentPinCode,
            "state": this.data.currentState,
            "street": this.data.currentStreet
          }
        ],
        "bloodGroup": this.data.bloodGroup,
        "departmentDTO": {
          "depId": 0,
          "depName": ""
        },
        "designationDTO": {
          "desgId": 0,
          "desgName": this.data.designation
        },
        "dob": this.data.dob,
        "doj": "",
        "email": this.data.email,
        "employeeAccountDTO": {
          "pan": "",
          "pfNo": "",
          "uan": ""
        },
        "employeeId": 0,
        "employeeSkillDTOList": [
          {
            "levels": 0,
            "skillId": 0,
            "skillName": ""
          }
        ],
        "exitDate": "",
        "expDoj": this.data.experience,
        "firstName": this.data.firstName,
        "gender": "",
        "joiningLocation": "",
        "lastName": this.data.lastName,
        "manager": this.data.manager,
        "maritalStatusDate": "",
        "primaryEmergencyContactNumber": this.data.emergencyContact,
        "primaryPhoneNumber": 0,
        "roleDTO": {
          "roleId": 0,
          "roleName": this.data.role
        },
        "secondaryEmergencyContactNumber": 0,
        "secondaryPhoneNumber": 0,
        "status": "",
        "type": this.data.type,
        "workPhone": 0
      }
    ]
    this.https.httpPostWithHeader(this.apiList.createEmployee, sendData).subscribe((res: any) => {
      let employees: any[] = [];
      
      employees = res;
      localStorage.setItem('employees', JSON.stringify(employees));
      this.router.navigateByUrl('/employees');
    })
  }

}
