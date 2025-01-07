import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "../../components/UI/Button"
import { Header } from "../../components/UI/Header"
import { IAddICUCredentials } from "../../interfaces/addICUInterface";
import { addICUFieldConfig } from "../../data/addICUConfig";
import { Label } from "../../components/UI/Label";
import Input from "../../components/UI/Input";
import { InputErorrMessage } from "../../components/UI/InputErorrMessage";
import { addICUValidation } from "../../validation/addICUValidation";
import Select from "../../components/UI/Select";
import { stringToBoolean } from "../../helpers";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "../../interfaces";
import axiosInstance from "../../config/axios.config";
import useAuthenticatedQuery from "../../hooks/useAuthenticatedQuery";
import { IHospital } from "../../interfaces/hospitalinterface";

export const AddICU = () => {
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  /* ____________ STATE ____________ */
  const [ICUData, setICUData] = useState<IAddICUCredentials>({
    ICUIdentifier: "",
    specialization: "",
    availability: false
  });
  const [errors, setErrors] = useState({
    ICUIdentifier: "",
    specialization: "",
    availability: ""
  });
  const [isAdded, setIsAdded] = useState(false);

  const [hospital, setHospital] = useState<IHospital | null>({
    id: 0,
    documentId: "",
    name: "",
    phoneNumber: "",
    createdAt: "",
    updatedAt: "",
    latitude: 0.0,
    longitude: 0.0,
  })

  /* ____________ REQUESTS ____________ */
  const { isLoading, data } = useAuthenticatedQuery({
    queryKey: ["hospital"],
    url: `hospitalAdmin/myHospital`,
    config: {
      headers: {
        Authorization: `Bearer ${userData?.jwt}`,
      },
    },
  });

  /* ____________ HANDLER ____________ */

  useEffect(() => {
    if (data) {
      setHospital(data);
    } else {
      setHospital(null)
    }
  }, [data]);
  

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { value, name } = event.target;

    const updatedData = {
      ...ICUData,
      [name]: name == "availability" ? stringToBoolean(value): value,
    };

    setICUData(updatedData);

    const validationErrors = addICUValidation(updatedData);

    setErrors(validationErrors);
  };
  const submitHandler = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const errors = addICUValidation(ICUData);
    
    const hasErrorsMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "")
    
    if (! hasErrorsMsg) {
      setErrors(errors);
      return;
    }

    setIsAdded(true);
    
    if (!hospital?.id) {
      toast.error("No hospital assigned or available", {
        position: "bottom-center",
        duration: 4000,
        style: {backgroundColor: "black", color: "white", width: "fit-content"},
      });
      return;
    }

    try {
      const { status } = await axiosInstance.post(
        "hospitalAdmin/icus", 
        { ...ICUData, hospitalID: hospital.id }, 
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`
          }
        }
      );
      if (status == 201) {
        toast.success("ICU data successfully created! You can add another ICU.",
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
      toast.error("add ICU failed",
        {
          position: "bottom-center",
          duration: 4000,
          style: {backgroundColor: "black", color: "white", width: "fit-content",},
        }
      );
    } finally {
      setIsAdded(false);
    }
  }

  /* ____________ RENDER ____________ */
  const renderAddICUInputsForm = addICUFieldConfig.map((input, idx) => (
    <div key={idx}>
      <Label htmlFor={input.id}>{input.label}</Label>
      {
        input.name != "availability" ? (
          <>
            <Input
              id={input.id}
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              value={ICUData[input.name]}
              onChange={onChangeHandler}
              isError={!!errors[input.name]}
            />
            <InputErorrMessage message={errors[input.name]} />
          </>
        ) : (
          <Select
            width="full"
            id={input.id}
            name={input.name}
            onChange={onChangeHandler}
          >
            <option value="false">false</option>
            <option value="true">true</option>
          </Select>
        )
      }
    </div>
  ));

  if (isLoading) return <h3>Loading...</h3>;

  return (
    <>
      <Header 
        heading="Add New ICU" 
        subtitle="Fill out the form to register a new ICU, including its name, contact information, and location details. This will enable hospital admins to manage ICU operations effectively."
      />
      {hospital ? (
        <div className="flex flex-col gap-10">
          <div className="space-y-6 p-4 bg-white shadow-md rounded-lg border border-gray-200  lg:w-[700px]">
            <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2">
              Hospital Information
            </h2>
            <div className="text-gray-700 space-y-3">
              <p><strong>ID:</strong> {hospital.id}</p>
              <p><strong>Name:</strong> {hospital.name}</p>
              <p><strong>Phone Number:</strong> {hospital.phoneNumber}</p>
              <p><strong>Created At:</strong> {hospital.createdAt}</p>
              <p><strong>Updated At:</strong> {hospital.updatedAt}</p>
              <p><strong>Latitude:</strong> {hospital.latitude}</p>
              <p><strong>Longitude:</strong> {hospital.longitude}</p>
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <div className="w-[600px] space-y-8">
              <form className="space-y-4" onSubmit={submitHandler}>
                {renderAddICUInputsForm}
                <Button variant="normal" type="submit" isLoading={isAdded}>Add hospital</Button>
              </form>
            </div>
          </div>

        </div>
      ) : (
        <p className="text-xl font-bold text-red-500">No hospital assigned</p>
      )}
    </>
  )
}
