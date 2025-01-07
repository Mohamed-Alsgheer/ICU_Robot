export interface IAddHospitalAdminCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IAddHospitalAdminFieldConfig {
  id: string;
  label?: string;
  name: "username" | "email" | "password" | "confirmPassword";
  placeholder: string;
  type: string;
}