import { ChangeEvent, FormEvent, useState } from "react"
import { Button } from "../../components/UI/Button"
import Input  from "../../components/UI/Input"
import { InputErorrMessage } from "../../components/UI/InputErorrMessage"
import { Label } from "../../components/UI/Label"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { IAddHospitalAdminCredentials } from "../../interfaces/addHospitalAdminInterfaces"
import { addHospitalAdminValidation } from "../../validation/addHospitalAdminValidation"
import { IErrorResponse } from "../../interfaces"
import { addHospitalAdminFieldConfig } from "../../data/addHospitalAdminConfig"
import axiosInstance from "../../config/axios.config"
import { Header } from "../../components/UI/Header"

export const AddHospitalAdmin = () => {

  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString): null;

  /* ____________ STATE ____________ */
  const [hospitalAdminData, setHospitalAdminData] = useState<IAddHospitalAdminCredentials>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  /* ____________ HANDLER ____________ */
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
  
    const updatedData = {
      ...hospitalAdminData,
      [name]: value,
    };
  
    setHospitalAdminData(updatedData);
  
    const validationErrors = addHospitalAdminValidation(updatedData);
  
    setErrors(validationErrors);
  };

  const submitHandler = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const errors = addHospitalAdminValidation(hospitalAdminData);
    
    const hasErrorsMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "")
    
    if (! hasErrorsMsg) {
      setErrors(errors);
      return;
    }

    setIsLoading(true);
    
    try {
      const { status } = await axiosInstance.post(
        "/superAdmin/users", 
        {...hospitalAdminData}, 
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`
          }
        },
      );
      if (status == 201) {
        toast.success("Hospital admin account successfully created! You can add another admin.",
          {
            position: "bottom-center",
            duration: 2000,
            style: {backgroundColor: "black", color: "white", width: "fit-content",},
          }
        );
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      console.log(errorObj);
      toast.error("add hospital admin failed",
        {
          position: "bottom-center",
          duration: 4000,
          style: {backgroundColor: "black", color: "white", width: "fit-content",},
        }
      );
    } finally {
      setIsLoading(false);
    }
  }

  /* ____________ RENDER ____________ */
  const renderLoginInputsForm = addHospitalAdminFieldConfig.map(({id, label, type, name, placeholder}, idx) =>(
    <div key={idx}>
      <Label htmlFor={id}>{label}</Label>
      {/* !! => convert any value to true or false without needing conditional logic. */}
      <Input id={id} type={type} name={name} placeholder={placeholder} value={userData[name]} onChange={onChangeHandler} isError={!!errors[name]} />
      <InputErorrMessage message={errors[name]}/>
    </div>
  ));

  /* ____________ PAGE ____________ */
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[600px] space-y-8">
        <Header heading="new hospital admin" subtitle="Empowered to manage ICUs, assign patients to ICUs, and ensure smooth operations within the hospital." />
        <form className="space-y-4" onSubmit={submitHandler}>
          {renderLoginInputsForm}
          <Button variant="normal" isLoading={isLoading}>Add hospital admin</Button>
        </form>
      </div>
    </div>
  )
}
