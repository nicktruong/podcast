import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { joiResolver } from "@hookform/resolvers/joi";

import { Roles } from "@/common/enums";
import { routes } from "@/common/constants";
import { selectUser, setUser } from "@/store/user";
import { selectCategories } from "@/store/category";
import CategoriesForm from "@/containers/CategoriesForm";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { RegistrationInterests } from "@/common/interfaces";
import { createUserDocument, getUserInfo } from "@/firebase";

import schema from "./schema";

const InterestCategoriesSelection = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const categories = useAppSelector(selectCategories);
  // const initialLoading = useAppSelector(selectInitialUserDataLoading);

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationInterests>({
    defaultValues: {
      categoriesOfInterest: [],
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: joiResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!user.id || !user.email) {
      // TODO: inform user about this error
      console.log("Your account must have a corresponding email");

      return;
    }

    await createUserDocument({
      uid: user.id,
      role: Roles.LISTENER,
      email: user.email,
      name: user.name ?? "",
      categoriesOfInterest: data.categoriesOfInterest,
    });

    const userInfo = await getUserInfo(user.id);

    dispatch(
      setUser({
        ...userInfo,
      })
    );

    // navigate to home
    navigate(routes.index);
  });

  return (
    <form onSubmit={onSubmit}>
      <Box className="max-w-[26rem] mx-auto sm:-translate-x-6 pb-10 mt-20">
        <Typography className="sm:pl-16 sm:pr-4 mt-4 !mb-8 !font-bold !text-2xl">
          Choose your interest categories
        </Typography>

        <CategoriesForm
          errors={errors}
          setValue={setValue}
          categories={categories}
          isSubmitting={isSubmitting}
          chosenCategories={watch("categoriesOfInterest")}
        />
      </Box>
    </form>
  );
};

export default InterestCategoriesSelection;
