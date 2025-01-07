export interface IRobot {
  id: number;
  documentId: string;
  patientName: string;
  patientEmail: string;
  patientSickness: string;
  patientFamilyEmails: string[];
  latitude?: number;
  longitude?: number;
  createdAt: string;
  updatedAt: string;
}