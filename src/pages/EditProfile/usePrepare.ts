import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { editProfileAction, selectUser } from "@/store/user";
import { FORM_DEFAULT_VALUES } from "@/common/constants";
import { EditProfile } from "@/common/interfaces/EditProfile";

import schema from "./schema";
import { useStyles } from "./styles";

const { AVATAR, BIO, NAME } = FORM_DEFAULT_VALUES;

export const usePrepare = () => {
  const dispatch = useAppDispatch();

  const [tempAvatar, setTempAvatar] = useState("");

  const { classes } = useStyles();

  const inputRef = useRef<HTMLInputElement>(null);

  const user = useAppSelector(selectUser);

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfile>({
    defaultValues: {
      bio: BIO,
      name: NAME,
      avatar: AVATAR,
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: joiResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(editProfileAction(data));
    reset();
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
