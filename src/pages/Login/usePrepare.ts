import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "@firebase/util";
import { joiResolver } from "@hookform/resolvers/joi";

import { routes } from "@/common/constants";
import { loginWithEmailPassword } from "@/firebase";
import { FORM_DEFAULT_VALUES } from "@/common/constants/formDefaultValues";

import schema from "./schema";

import type { LoginData } from "@/common/interfaces";

const { EMAIL, PASSWORD } = FORM_DEFAULT_VALUES;

const usePrepare = () => {
  const navigate = useNavigate();
  const [submitErrorCode, setSubmitErrorCode] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    defaultValues: {
      email: EMAIL,
      password: PASSWORD,
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

export default usePrepare;
