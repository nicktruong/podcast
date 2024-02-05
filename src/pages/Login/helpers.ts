import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "@firebase/util";
import { useTranslation } from "react-i18next";
import { joiResolver } from "@hookform/resolvers/joi";

import { loginEmailPassword } from "@/firebase";
import { routes, LOGIN_DEFAULT_DATA } from "@/constants";

import schema from "./schema";

import type { LoginData } from "@/common/interfaces";

const usePrepareHook = () => {
  const { t } = useTranslation("pages/Login");

  const navigate = useNavigate();
  const [submitErrorCode, setSubmitErrorCode] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: joiResolver(schema),
    defaultValues: LOGIN_DEFAULT_DATA,
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await loginEmailPassword(data);
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
    isSubmitting,
    submitErrorCode,
    t,
    onSubmit,
  };
};

export default usePrepareHook;
