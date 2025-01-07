import { ILoginFieldConfig } from "../interfaces/loginInterfaces";

export const loginFieldConfig: ILoginFieldConfig[] = [
  {
    id: "email",
    label: "email",
    name: "identifier",
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
]