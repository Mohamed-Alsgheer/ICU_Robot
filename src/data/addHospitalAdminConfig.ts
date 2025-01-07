import { IAddHospitalAdminFieldConfig } from "../interfaces/addHospitalAdminInterfaces";

export const addHospitalAdminFieldConfig: IAddHospitalAdminFieldConfig[] = [
  {
    id: "username",
    label: "username",
    name: "username",
    placeholder: "username",
    type: "text"
  },
  {
    id: "email",
    label: "email",
    name: "email",
    placeholder: "email",
    type: "email"
  },
  {
    id: "password",
    label: "password",
    name: "password",
    placeholder: "password",
    type: "password"
  },
  {
    id: "confirmPassword",
    label: "confirm Password",
    name: "confirmPassword",
    placeholder: "confirm Password",
    type: "password"
  },
]