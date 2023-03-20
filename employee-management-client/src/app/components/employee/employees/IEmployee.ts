export interface IEmployee {
  empId: number;
  firstName: string;
  gender: string;
  dob: string;
  bloodGroup: string;
  primaryPhoneNumber: number;
  secondaryPhoneNumber: number;
  lastName: string;
  workPhone: number;
  primaryEmergencyContactNumber: number;
  secondaryEmergencyContactNumber: number;
  maritalStatusDate: number;
  email: string;
  doj: string;
  expDoj: number;
  exitDate: number;
  type: string;
  joiningLocation: string;
  status: string;
  manager: string;
  designation: {
    desgId: number;
    desgName: string;
  };
  department: {
    depId: number;
    depName: string;
  };
  role: {
    roleId: number;
    roleName: string;
  };
}
