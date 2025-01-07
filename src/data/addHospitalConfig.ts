import { IAddHospitalFieldConfig } from "../interfaces/addHospitalInterfaces";

export const addHospitalFieldConfig: IAddHospitalFieldConfig[] = [
  {
    id: "name",
    label: "hospital name",
    name: "name",
    placeholder: "Enter hospital name",
    type: "text"
  },
  {
    id: "phoneNumber",
    label: "phone number",
    name: "phoneNumber",
    placeholder: "Enter hospital phone number",
    type: "text"
  },
  {
    id: "latitude",
    label: "latitude",
    name: "latitude",
    placeholder: "Enter hospital latitude",
    type: "text"
  },
  {
    id: "longitude",
    label: "longitude",
    name: "longitude",
    placeholder: "Enter hospital longitude",
    type: "text"
  },
]