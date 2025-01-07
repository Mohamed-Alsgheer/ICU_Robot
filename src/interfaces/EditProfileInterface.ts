export interface IProfileCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IProfileFieldConfig {
  id: string;
  label?: string;
  name: "username" | "email" | "password" | "confirmPassword";
  placeholder: string;
  type: string;
}