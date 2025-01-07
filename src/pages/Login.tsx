import { ChangeEvent, FormEvent, useState } from "react"
import { Button } from "../components/UI/Button"
import Input  from "../components/UI/Input"
import { loginFieldConfig } from "../data/loginFieldConfig"
import { ILoginCredentials } from "../interfaces/loginInterfaces"
import { loginValidation } from "../validation/loginValidation"
import { InputErorrMessage } from "../components/UI/InputErorrMessage"
import { Label } from "../components/UI/Label"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { IErrorResponse } from "../interfaces"
import { Header } from "../components/UI/Header"
import axiosInstance from "../config/axios.config"

export const LoginPage = () => {

  /* ____________ STATE ____________ */
  const [userData, setUserData] = useState<ILoginCredentials>({
    identifier: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    identifier: "",
    password: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  /* ____________ HANDLER ____________ */
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
  
    const updatedData = {
      ...userData,
      [name]: value,
    };
  
    setUserData(updatedData);
  
    const validationErrors = loginValidation(updatedData);
  
    setErrors(validationErrors);
  };
  

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const errors = loginValidation(userData);
    
    const hasErrorsMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "")
    
    if (! hasErrorsMsg) {
      setErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const { status, data } = await axiosInstance.post("auth/login/", {email: userData.identifier, password: userData.password});
      console.log(userData);
      if (status == 200) {
        toast.success("You will navigate to the home page after 2 seconds.",
          {
            position: "bottom-center",
            duration: 2000,
            style: {backgroundColor: "black", color: "white", width: "fit-content",},
          }
        );
      
        localStorage.setItem("loggedInUser", JSON.stringify(data));
      
        setTimeout(() => {
          location.replace("/");
        }, 2000);
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      console.log(errorObj);
      
      toast.error("Login failed",
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
  const renderLoginInputsForm = loginFieldConfig.map((input, idx) =>(
    <div key={idx}>
      <Label htmlFor={input.id}>{input.label}</Label>
      {/* !! => convert any value to true or false without needing conditional logic. */}
      <Input id={input.id} type={input.type} name={input.name} placeholder={input.placeholder} value={userData[input.name]} onChange={onChangeHandler} isError={!!errors[input.name]} />
      <InputErorrMessage message={errors[input.name]}/>
    </div>
  ));

  return (
    <div className="h-[600px] flex items-center justify-center max-lg:px-3">
      <div className="w-[600px] space-y-8">
        <Header heading="Login to get access!" />
        <form className="space-y-5" onSubmit={submitHandler}>
          {renderLoginInputsForm}
          
          <Button variant="normal" isLoading={isLoading}>Login</Button>
        </form>
      </div>
    </div>
  )
}
