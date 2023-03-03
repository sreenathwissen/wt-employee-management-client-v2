import { Department } from "./department.model";
import { Designation } from "./designation.model";
import { Role } from "./role.model";

export interface Employee {
    bloodGroup: string;
    department: Department;
    designation: Designation;
    dob: Date;
    doj: Date;
    email: string;
    empId: number;
    exitDate: Date;
    expDoj: string;
    firstName: string;
    lastName: string;
    gender: string;
    joiningLocation: string;
    manager: string;
    maritalStatusDate: Date;
    primaryEmergencyContactNumber: number;
    primaryPhoneNumber: number;
    role: Role;
    secondaryEmergencyContactNumber: number;
    secondaryPhoneNumber: number;
    status: string;
    type: string;
    workPhone: number;
}

