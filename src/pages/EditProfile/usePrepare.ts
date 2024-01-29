import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { editProfileAction, selectUser } from "@/store/user";
import { EditProfile } from "@/common/interfaces/EditProfile";
import { EDIT_PROFILE_DEFAULT_DATA, routes } from "@/common/constants";

import schema from "./schema";
import { useStyles } from "./styles";

export const usePrepare = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [tempAvatar, setTempAvatar] = useState("");

  const { classes } = useStyles();

  const inputRef = useRef<HTMLInputElement>(null);

  const user = useAppSelector(selectUser);

  const {
    // reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfile>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: joiResolver(schema),
    defaultValues: EDIT_PROFILE_DEFAULT_DATA,
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(editProfileAction(data));
    navigate(routes.profile.replace(":id", user?.id ?? ""));
  });

  const handleAvatarSubmit = (file: File | undefined) => {
    if (file) {
      setValue("avatar", file);
      setTempAvatar(URL.createObjectURL(file));
    }
  };

  const choosePhoto = () => {
    inputRef.current?.click();
  };

  return {
    classes,
    user,
    inputRef,
    control,
    errors,
    tempAvatar,
    choosePhoto,
    setValue,
    onSubmit,
    handleAvatarSubmit,
  };
};
