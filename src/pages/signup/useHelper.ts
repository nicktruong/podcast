import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";

import { signup } from "@/firebase";
import routes from "@/common/constants/routes";
import { IUserRegister } from "@/common/interfaces";

import schema from "./schema";
import { Steps } from "./interface";

const useHelper = () => {
  const [activeStep, setActiveStep] = useState(Steps.Email);
  const navigate = useNavigate();

  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUserRegister>({
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

  const onSubmit = handleSubmit(async (data) => {
    await signup(data);
    navigate(routes.index, { replace: true });
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
    isSubmitting,
    validateDate,
    validateEmail,
    handleNextStep,
    handlePrevStep,
    validatePassword,
    validateUserInformation,
  };
};

export default useHelper;
