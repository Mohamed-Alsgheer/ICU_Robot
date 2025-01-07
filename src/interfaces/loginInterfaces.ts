


export interface ILoginCredentials {
  identifier: string;
  password: string;
}

export interface ILoginFieldConfig {
  id: string;
  label?: string;
  name: "identifier" | "password";
  placeholder?: string;
  type: string;
}