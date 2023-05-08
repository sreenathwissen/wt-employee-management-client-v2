export interface IEmployee {
  bloodGroup: string;
  department: IDepartment;
  designation: IDesignation;
  dob: number;
  doj: string;
  email: string;
  empId: number;
  expDoj: string;
  firstName: string;
  gender: string;
  joiningLocation: string;
  lastName: string;
  manager: string;
  maritalStatusDate: string;
  primaryEmergencyContactNumber: number;
  primaryPhoneNumber: number;
  role: IRole;
  secondaryEmergencyContactNumber: number;
  secondaryPhoneNumber: number;
  status: string;
  type: string;
  workPhone: number;
}

export interface IDepartment {
  depId: number;
  depName: string;
}

export interface IRole {
  roleId: number;
  roleName: string;
}

export interface IDesignation {
  desgId: number;
  desgName: string;
}

export interface IManager {
  name: string;
  id: number;
  email: string;
}