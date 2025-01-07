import { IHospital } from "./hospitalinterface";

export interface IHospitalAdmin {
  id: number;
  documentId: string;
  username: string;
  email: string;
  createdAt: string;
  hospital: IHospital
}
