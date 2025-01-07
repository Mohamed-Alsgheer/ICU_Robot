export interface IAddICUCredentials {
  ICUIdentifier: string;
  specialization: string;
  availability: boolean;
}

export interface IAddICUFieldConfig {
  id: string;
  label?: string;
  name: "ICUIdentifier" | "specialization" | "availability";
  placeholder: string;
  type: string;
}






