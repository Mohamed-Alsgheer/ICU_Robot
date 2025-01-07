import { ChangeEvent, FormEvent, useState } from "react";
import { IAddRobotCredentials } from "../../interfaces/addRobotInterfaces";
import { addRobotFieldConfig } from "../../data/addRobotConfig";
import { Label } from "../../components/UI/Label";
import Input from "../../components/UI/Input";
import { InputErorrMessage } from "../../components/UI/InputErorrMessage";
import { Textarea } from "../../components/UI/Textarea";
import { addRobotValidation } from "../../validation/addRobotValidation";
import { Button } from "../../components/UI/Button";
import { Header } from "../../components/UI/Header";
import { Collapsible } from "../../components/UI/Collapsible";
import Modal from "../../components/UI/Modal";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "../../interfaces";
import { arrayToIndexedObject } from "../../helpers";

export const AddRobot = () => {
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString): null;

  const [robotData, setRobotData] = useState<IAddRobotCredentials>({
    patientName: "",
    patientEmail: "",
    patientSickness: "",
    patientFamilyEmail: "",
    patientFamilyEmails: [""],
  });

  const [errors, setErrors] = useState({
    patientName: "",
    patientEmail: "",
    patientSickness: "",
    patientFamilyEmail: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false)


  /* ____________ HANDLER ____________ */
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { value, name } = event.target;
  
    const updatedData = {
      ...robotData,
      [name]: value,
    };
  
    setRobotData(updatedData);
  
    const validationErrors = addRobotValidation(updatedData);
  
    setErrors(validationErrors);
  };

  const onAddNewFamilyEmail = (patientFamilyEmail: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setRobotData((prevData) => {
      const cleanedEmails = prevData.patientFamilyEmails.filter((email) => email.trim() !== "");

      if (!emailRegex.test(patientFamilyEmail) || cleanedEmails.includes(patientFamilyEmail)) {
        setIsModalOpen(true);
        return prevData;
      }

      return {
        ...prevData,
        patientFamilyEmails: [...cleanedEmails, patientFamilyEmail],
      };
    });
  };

  const onRemoveFamilyEmail = (emailToRemove: string) => {
    setRobotData((prevData) => ({
      ...prevData,
      patientFamilyEmails: prevData.patientFamilyEmails.filter((email) => email !== emailToRemove),
    }));
  };

  const submitHandler = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const errors = addRobotValidation(robotData);
    
    const hasErrorsMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "")
    
    if (! hasErrorsMsg) {
      setErrors(errors);
      return;
    }

    setIsLoading(true);
    
    try {
      const { patientName, patientEmail, patientSickness, patientFamilyEmails } = robotData
      const indexedFamilyEmails = arrayToIndexedObject(patientFamilyEmails);
      const { status } = await axiosInstance.post(
        "/robots", 
        { data: { patientName, patientEmail, patientSickness, patientFamilyEmails:indexedFamilyEmails } }, 
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`
          }
        }
      );
      if (status == 201) {
        toast.success("Robot successfully created! You can add another robot.",
          {
            position: "bottom-center",
            duration: 2000,
            style: {backgroundColor: "black", color: "white", width: "fit-content",},
          }
        );
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      toast.error(errorObj.response?.data.error.message || "add robot failed",
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
  const renderAddRobotInputsForm = addRobotFieldConfig.map(({id, label, type, name, placeholder}, idx) =>(
    <div key={idx}>
      <Label htmlFor={id}>{label}</Label>
      {
        name == "patientSickness" ? (
          <Textarea 
            id={id} 
            name={name} 
            placeholder={placeholder} 
            onChange={onChangeHandler} 
            isError={!!errors[name]} 
            value={robotData[name]}
          />
          ) : name == "patientFamilyEmail" ? (
            <div className="flex flex-col gap-5">
              <Collapsible title="Click to show Patient Family Emails">
                <div className="flex flex-col gap-3">
                  {robotData.patientFamilyEmails.map((email, index) => (
                    email && (
                      <div key={index} className="flex justify-between items-center">
                        <span>{email}</span>
                        <Button type="button" variant="danger" width="fit" onClick={() => onRemoveFamilyEmail(email)}>
                          Delete
                        </Button>
                      </div>
                    )
                  ))}
                </div>
              </Collapsible>
              <div className="flex gap-3">
                <Input id={id} type={type} name={name} placeholder={placeholder} value={robotData[name]} onChange={onChangeHandler} isError={!!errors[name]} />
                <Button type="button" variant="success" width="fit" onClick={() => onAddNewFamilyEmail(robotData[name])}>add</Button>
              </div>
            </div>
          ) : (
          <Input id={id} type={type} name={name} placeholder={placeholder} value={robotData[name]} onChange={onChangeHandler} isError={!!errors[name]} />
        ) 
      }
      <InputErorrMessage message={errors[name]}/>
    </div>
  ));

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[600px] space-y-8">
        <Header 
          heading="Add New Patient Robot" 
          subtitle="Easily assign a robot to patients, manage family communications, and streamline patient care with our intuitive interface." 
        />
        <form className="space-y-4" onSubmit={submitHandler}>
          {renderAddRobotInputsForm}
          <Button variant="normal" isLoading={isLoading}>Add robot</Button>
        </form>
      </div>
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}
        title="Invalid email format. Please enter a valid email or This email already exists in the list."
      >
        <div className="flex items-center space-x-3 mt-4">
          <Button variant="warning" type="button" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  )
}
