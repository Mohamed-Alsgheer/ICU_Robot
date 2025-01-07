import { IAddRobotFieldConfig } from "../interfaces/addRobotInterfaces";

export const addRobotFieldConfig: IAddRobotFieldConfig[] = [
  {
    id: "patientName",
    label: "patient Name",
    name: "patientName",
    placeholder: "Enter patient full name",
    type: "text"
  },
  {
    id: "patientEmail",
    label: "patient Email",
    name: "patientEmail",
    placeholder: "Enter patient email ",
    type: "email"
  },
  {
    id: "patientSickness",
    label: "patient Sickness",
    name: "patientSickness",
    placeholder: "Enter patient Sickness ",
    type: "text"
  },
  {
    id: "patientFamilyEmails",
    label: "patient Family Emails",
    name: "patientFamilyEmail",
    placeholder: "Enter patient family email ",
    type: "email"
  },
]