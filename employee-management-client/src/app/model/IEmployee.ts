export interface IEmployee {
  bloodGroup: string;
  department: { depId: number; depName: string };
  designation: { desgId: number; desgName: string };
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
  role: { roleId: number; roleName: string };
  secondaryEmergencyContactNumber: number;
  secondaryPhoneNumber: number;
  status: string;
  type: string;
  workPhone: number;
}
