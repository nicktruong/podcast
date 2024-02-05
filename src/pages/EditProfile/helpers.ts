import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";

import { editProfile, selectUser } from "@/store/user";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { EDIT_PROFILE_DEFAULT_DATA, routes } from "@/constants";

import schema from "./schema";
import { useStyles } from "./styles";

import type { EditProfile } from "@/common/interfaces";

export const usePrepareHook = () => {
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
  } = useForm<Omit<EditProfile, "userId">>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: joiResolver(schema),
    defaultValues: EDIT_PROFILE_DEFAULT_DATA,
  });

  const onSubmit = handleSubmit((data) => {
    if (!user?.id) return;

    dispatch(editProfile({ userId: user.id, ...data }));
    navigate(routes.profile.replace(":id", user.id));
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
