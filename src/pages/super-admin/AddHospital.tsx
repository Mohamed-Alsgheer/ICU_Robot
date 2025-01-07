import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../../components/UI/Input";
import { InputErorrMessage } from "../../components/UI/InputErorrMessage";
import { Label } from "../../components/UI/Label";
import { addHospitalFieldConfig } from "../../data/addHospitalConfig";
import { IAddHospitalCredentials } from "../../interfaces/addHospitalInterfaces";
import { addHospitalValidation } from "../../validation/addHospitalValidation";
import { Button } from "../../components/UI/Button";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "../../interfaces";
import { Header } from "../../components/UI/Header";
import MapContainer from "../../components/UI/MapContainer";

export const AddHospital = () => {

  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const [hospitalData, setHospitalData] = useState<IAddHospitalCredentials>({
    name: "",
    phoneNumber: "",
    latitude: 0.0,
    longitude: 0.0
  });

  const [errors, setErrors] = useState({
    name: "",
    phoneNumber: "",
    latitude: "",
    longitude: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  /* ____________ HANDLER ____________ */
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;

    // Convert lat/lng to float on change
    const updatedData = {
      ...hospitalData,
      [name]: name === "latitude" || name === "longitude" ? (isNaN(parseFloat(value)) ? 0 : parseFloat(value)) : value,
    };

    setHospitalData(updatedData);

    const validationErrors = addHospitalValidation(updatedData);

    setErrors(validationErrors);
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = addHospitalValidation(hospitalData);

    const hasErrorsMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "");

    if (!hasErrorsMsg) {
      setErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const { status } = await axiosInstance.post(
        "/superAdmin/hospitals", 
        { ...hospitalData }, 
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          }
        }
      );
      if (status === 201) {
        toast.success("Hospital successfully created!", {
          position: "bottom-center",
          duration: 2000,
          style: { backgroundColor: "black", color: "white", width: "fit-content" },
        });
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      console.log(errorObj);
      toast.error("add hospital failed", {
        position: "bottom-center",
        duration: 4000,
        style: { backgroundColor: "black", color: "white", width: "fit-content" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* ____________ RENDER ____________ */
  const renderAddHospitalInputsForm = addHospitalFieldConfig.map((input, idx) => (
    <div key={idx}>
      <Label htmlFor={input.id}>{input.label}</Label>
      {/* !! => convert any value to true or false without needing conditional logic. */}
      <Input
        id={input.id}
        type={input.type}
        name={input.name}
        placeholder={input.placeholder}
        value={hospitalData[input.name]}
        onChange={onChangeHandler}
        isError={!!errors[input.name]}
      />
      <InputErorrMessage message={errors[input.name]} />
    </div>
  ));

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[600px] space-y-8">
        <Header 
          heading="Add New Hospital" 
          subtitle="Fill out the form to register a new hospital, including its name, contact information, and location details. This will enable hospital admins to manage ICU operations effectively."
        />
        <form className="space-y-4" onSubmit={submitHandler}>
          {renderAddHospitalInputsForm}
          <MapContainer 
            coordinates={{
              lat: hospitalData.latitude, 
              lng: hospitalData.longitude
            }} 
            mapContainerStyle={{ width: '100%', height: '400px' }} 
            mainLocation={{
              lat: hospitalData.latitude, 
              lng: hospitalData.longitude
            }}
          />
          <Button variant="normal" type="submit" isLoading={isLoading}>Add hospital</Button>
        </form>
      </div>
    </div>
  );
};
