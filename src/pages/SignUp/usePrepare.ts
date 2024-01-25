import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";

import { signup } from "@/firebase";
import { routes } from "@/common/constants";
import { SignUpSteps } from "@/common/enums";
import { useAppSelector } from "@/hooks/redux";
import { selectCategories } from "@/store/category";
import { FORM_DEFAULT_VALUES } from "@/common/constants/formDefaultValues";

import schema from "./schema";

import type { RegisterData } from "@/common/interfaces";

const {
  NAME,
  DATE,
  YEAR,
  MONTH,
  EMAIL,
  GENDER,
  PASSWORD,
  CATEGORIES_OF_INTEREST,
} = FORM_DEFAULT_VALUES;

const usePrepare = () => {
  const navigate = useNavigate();
  const categories = useAppSelector(selectCategories);
  const [activeStep, setActiveStep] = useState(SignUpSteps.Email);

  const {
    watch,
    control,
    trigger,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    defaultValues: {
      name: NAME,
      date: DATE,
      year: YEAR,
      month: MONTH,
      email: EMAIL,
      gender: GENDER,
      password: PASSWORD,
      categoriesOfInterest: CATEGORIES_OF_INTEREST,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: joiResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    await signup(data);
    navigate(routes.index, { replace: true });
  });

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

  const nextStepHandler = async () => {
    switch (activeStep) {
      case SignUpSteps.Email: {
        const isValidEmail = await validateEmail();

        if (!isValidEmail) {
          return;
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        break;
      }

      case SignUpSteps.Password: {
        const isValidPassword = await validatePassword();

        if (!isValidPassword) {
          return;
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        break;
      }

      case SignUpSteps.UserInfo: {
        const isValidUserInfo = await validateUserInformation();

        if (!isValidUserInfo) {
          return;
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        break;
      }

      case SignUpSteps.Categories: {
        onSubmit();
        break;
      }

      default: {
        break;
      }
    }
  };

  return {
    errors,
    control,
    categories,
    activeStep,
    isSubmitting,
    watch,
    trigger,
    setValue,
    onSubmit,
    getValues,
    validateDate,
    validateEmail,
    handlePrevStep,
    nextStepHandler,
    validatePassword,
    validateUserInformation,
  };
};

export default usePrepare;
