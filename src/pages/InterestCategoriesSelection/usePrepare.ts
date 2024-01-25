import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";

import { ROLES } from "@/common/enums";
import { routes, FORM_DEFAULT_VALUES } from "@/common/constants";
import { selectUser, setUser } from "@/store/user";
import { selectCategories } from "@/store/category";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { RegistrationInterests } from "@/common/interfaces";
import { createUserDocument, getUserInfo } from "@/firebase";

import schema from "./schema";

const { CATEGORIES_OF_INTEREST } = FORM_DEFAULT_VALUES;

export const usePrepare = () => {
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
    defaultValues: {
      categoriesOfInterest: CATEGORIES_OF_INTEREST,
    },
    resolver: joiResolver(schema),
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
      role: ROLES.LISTENER,
      name: user.name ?? "",
      photoURL: user.photoURL,
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