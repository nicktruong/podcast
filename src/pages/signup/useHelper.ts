import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";

import { signup } from "@/firebase";
import routes from "@/common/constants/routes";
import { IUserRegister } from "@/common/interfaces";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { fetchCategories, selectCategories } from "@/store/categorySlice";

import schema from "./schema";
import { Steps } from "./interface";

const useHelper = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const [activeStep, setActiveStep] = useState(Steps.Email);

  const {
    watch,
    control,
    trigger,
    setValue,
    getValues,
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
      categoriesOfInterest: [],
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
      case Steps.Email: {
        const isValidEmail = await validateEmail();

        if (!isValidEmail) {
          return;
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        break;
      }

      case Steps.Password: {
        const isValidPassword = await validatePassword();

        if (!isValidPassword) {
          return;
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        break;
      }

      case Steps.UserInfo: {
        const isValidUserInfo = await validateUserInformation();

        if (!isValidUserInfo) {
          return;
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        break;
      }

      case Steps.Categories: {
        onSubmit();
        break;
      }

      default: {
        break;
      }
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return {
    watch,
    errors,
    trigger,
    control,
    setValue,
    onSubmit,
    getValues,
    categories,
    activeStep,
    isSubmitting,
    validateDate,
    validateEmail,
    handlePrevStep,
    nextStepHandler,
    validatePassword,
    validateUserInformation,
  };
};

export default useHelper;
