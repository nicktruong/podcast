import { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { Steps } from "./constants";
import schema, { IRegisterForm } from "./schema";

const useHelper = () => {
  const [activeStep, setActiveStep] = useState(Steps.Email);

  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    defaultValues: {
      name: "",
      date: "",
      year: "",
      month: "",
      email: "",
      gender: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: joiResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePrevStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validateEmail = async () => {
    return trigger("email");
  };

  const validatePassword = async () => {
    return trigger("password");
  };

  const validateDate = async () => {
    await trigger(["date", "month", "year"]);

    return;
  };

  const validateUserInformation = async () => {
    return trigger(["name", "date", "month", "year", "gender"]);
  };

  return {
    errors,
    control,
    onSubmit,
    activeStep,
    validateDate,
    validateEmail,
    handleNextStep,
    handlePrevStep,
    validatePassword,
    validateUserInformation,
  };
};

export default useHelper;
