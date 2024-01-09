import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "@firebase/util";
import { useState } from "react";

import { IUserLogin } from "@/common/interfaces";
import { loginWithEmailPassword } from "@/firebase/login";
import routes from "@/common/constants/routes";

import schema from "./schema";

const useHelper = () => {
  const navigate = useNavigate();
  const [submitErrorCode, setSubmitErrorCode] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUserLogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: joiResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await loginWithEmailPassword(data);
      navigate(routes.index, { replace: true });
    } catch (error) {
      if (error instanceof FirebaseError) {
        setSubmitErrorCode(error.code);
      }
    }
  });

  return {
    errors,
    control,
    onSubmit,
    isSubmitting,
    submitErrorCode,
  };
};

export default useHelper;
