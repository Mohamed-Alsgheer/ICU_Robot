export interface IAddRobotCredentials {
  patientName: string;
  patientEmail: string;
  patientSickness: string;
  patientFamilyEmail: string;
  patientFamilyEmails: string[];
}

export interface IAddRobotFieldConfig {
  id: string;
  label?: string;
  name: "patientName" | "patientEmail" | "patientSickness" | "patientFamilyEmail";
  placeholder: string;
  type: string;
}