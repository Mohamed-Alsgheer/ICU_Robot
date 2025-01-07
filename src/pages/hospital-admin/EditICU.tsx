import { useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useAuthenticatedQuery from "../../hooks/useAuthenticatedQuery";
import { IAddICUCredentials } from "../../interfaces/addICUInterface";
import Input from "../../components/UI/Input";
import { addICUFieldConfig } from "../../data/addICUConfig";
import { Label } from "../../components/UI/Label";
import { InputErorrMessage } from "../../components/UI/InputErorrMessage";
import Select from "../../components/UI/Select";
import { stringToBoolean } from "../../helpers";
import { addICUValidation } from "../../validation/addICUValidation";
import { Button } from "../../components/UI/Button";
import { Header } from "../../components/UI/Header";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "../../interfaces";
import axiosInstance from "../../config/axios.config";

export const EditICU = () => {
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const { id } = useParams();

  const [ICUData, setICUData] = useState<IAddICUCredentials>({
    ICUIdentifier: "",
    specialization: "",
    availability: false,
  });

  const [isupdating, setIsupdating] = useState(false)

  const [errors, setErrors] = useState({
    ICUIdentifier: "",
    specialization: "",
    availability: ""
  });

  const { isLoading, data } = useAuthenticatedQuery({
    queryKey: ["icu", `${id}`],
    url: `hospitalAdmin/icus/${id}`,
    config: {
      headers: {
        Authorization: `Bearer ${userData?.jwt}`,
      },
    },
  });

  useEffect(() => {
    if (data) {
      setICUData({
        ICUIdentifier: data?.ICUIdentifier || "",
        specialization: data?.specialization || "",
        availability: data?.availability || false,
      });
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

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = addICUValidation(ICUData);
    
    const hasErrorsMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "")
    
    if (! hasErrorsMsg) {
      setErrors(errors);
      return;
    }

    setIsupdating(true)

    try {
      const { status } = await axiosInstance.put(
        `hospitalAdmin/icus/${id}`, 
        { ...ICUData }, 
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`
          }
        }
      );

      
      if (status == 200) {
        toast.success("ICU successfully updated!",
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
      toast.error("updated ICU failed",
        {
          position: "bottom-center",
          duration: 4000,
          style: {backgroundColor: "black", color: "white", width: "fit-content",},
        }
      );
    } finally {
      setIsupdating(false);
    }
  };


   /* ____________ RENDER ____________ */
  const renderEditICUInputsForm = addICUFieldConfig.map((input, idx) => (
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
            value={ICUData.availability ? "true" : "false"}
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
    <div>
      <div className="w-full flex items-center justify-center">
        <div className="w-[600px] space-y-8">
          <Header
            heading="Edit ICU Details"
            subtitle="Update the information for the ICU, including availability and other key details."
          />
          <form className="space-y-4" onSubmit={submitHandler}>
            {renderEditICUInputsForm}
            <Button variant="normal" type="submit" isLoading={isupdating}>
              Update ICU
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
