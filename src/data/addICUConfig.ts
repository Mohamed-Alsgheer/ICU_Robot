import { IAddICUFieldConfig } from "../interfaces/addICUInterface";

export const addICUFieldConfig: IAddICUFieldConfig[] = [
  {
    id: "name",
    label: "ICU Identifier",
    name: "ICUIdentifier",
    placeholder: "Enter ICU number or identifier",
    type: "text"
  },
  {
    id: "specialization",
    label: "specialization",
    name: "specialization",
    placeholder: "Enter ICU specialization",
    type: "text"
  },
  {
    id: "availability",
    label: "availability",
    name: "availability",
    placeholder: "Enter ICU availability",
    type: "text"
  }
]