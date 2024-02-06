import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";

import { routes, REGISTRATION_INTERESTS_DEFAULT_DATA } from "@/constants";
import { Genders, Roles } from "@/enums";
import { selectUser, setUser } from "@/store/user";
import { selectCategories } from "@/store/category";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { createUserDocument, getUserInfo } from "@/firebase";

import schema from "./schema";

import type { RegistrationInterests } from "@/common/interfaces";

export const usePrepareHook = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const categories = useAppSelector(selectCategories);

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationInterests>({
    resolver: joiResolver(schema),
    defaultValues: REGISTRATION_INTERESTS_DEFAULT_DATA,
  });

  const categoriesOfInterest = watch("categoriesOfInterest");

  const onSubmit = handleSubmit(async (data) => {
    if (!user?.id || !user.email) {
      // TODO: inform user about this error
      console.log("Your account must have a corresponding email");

      return;
    }

    // finish register flow
    await createUserDocument({
      uid: user.id,
      email: user.email,
      role: Roles.LISTENER,
      name: user.name ?? "",
      gender: Genders.UNKNOWN,
      photoURL: user.photoURL ?? "",
      categoriesOfInterest: data.categoriesOfInterest,
    });

    const userInfo = await getUserInfo(user.id);

    dispatch(
      setUser({
        ...userInfo,
      })
    );

    navigate(routes.index);
  });

  return {
    errors,
    categories,
    isSubmitting,
    categoriesOfInterest,
    onSubmit,
    setValue,
  };
};
