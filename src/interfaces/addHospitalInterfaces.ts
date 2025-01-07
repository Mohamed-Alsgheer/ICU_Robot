
export interface IAddHospitalCredentials {
  name: string;
  phoneNumber: string;
  latitude: number;
  longitude: number;
}

export interface IAddHospitalFieldConfig {
  id: string;
  label?: string;
  name: "name" | "phoneNumber" | "latitude" | "longitude";
  placeholder?: string;
  type: string;
}