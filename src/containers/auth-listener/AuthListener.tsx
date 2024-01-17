import { PropsWithChildren, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import {
  setLoading,
  getUserInfoAction,
  // selectInitialUserDataLoading,
} from "@/store/userSlice";
import { auth } from "@/firebase/init";
import { checkUserExists } from "@/firebase/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { OAuthRegisterCategories } from "@/common/interfaces/OAuthRegisterCategories";
import { fetchCategories, selectCategories } from "@/store/categorySlice";
import { CreateUserDoc, UserFirebase } from "@/common/interfaces";
import { Genders } from "@/common/constants/genders";
import { Roles } from "@/common/constants/roles";
import { createUserDoc } from "@/firebase/create-user-doc";

import CategoriesForm from "./components/CategoriesForm";
import schema from "./schema";

export default function AuthListener({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  // const initialLoading = useAppSelector(selectInitialUserDataLoading);
  const [chooseInterests, setChooseInterests] = useState(false);
  const categories = useAppSelector(selectCategories);
  const [user, setUser] = useState<CreateUserDoc & UserFirebase>();

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OAuthRegisterCategories>({
    defaultValues: {
      categoriesOfInterest: [],
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: joiResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    await createUserDoc({
      uid: user?.uid,
      email: user?.email ?? "",
      role: Roles.LISTENER,
      name: user?.name ?? "",
      categoriesOfInterest: data.categoriesOfInterest,
    });

    setChooseInterests(false);

    dispatch(
      getUserInfoAction({
        uid: user?.uid,
        emailVerified: user?.emailVerified,
        email: user?.email,
        photoURL: user?.photoURL,
        displayName: user?.displayName,
      })
    );
  });

  useEffect(() => {
    dispatch(fetchCategories());

    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        dispatch(setLoading(false));

        return;
      }

      const { email, emailVerified, displayName, photoURL, uid } = user;
      setUser({
        displayName: displayName ?? "",
        emailVerified,
        photoURL: photoURL ?? "",
        uid,
        categoriesOfInterest: [],
        gender: Genders.NON_BINARY,
        name: displayName ?? "",
        email: email ?? "",
        role: Roles.LISTENER,
      });

      // if user is logged in but haven't had
      // a corresponding user document then create one
      const userExists = await checkUserExists(user.uid);

      if (!userExists && user.email && user.displayName) {
        setChooseInterests(true);
        dispatch(setLoading(false));
        // TODO: let user choose categories of interest
        // navigate ...
        // await createUserDoc({
        //   uid: user.uid,
        //   email: user.email,
        //   role: Roles.LISTENER,
        //   name: user.displayName,
        // });
      } else {
        dispatch(
          getUserInfoAction({
            uid,
            emailVerified,
            email: email ?? "",
            photoURL: photoURL ?? "",
            displayName: displayName ?? "",
          })
        );
      }
    });
  }, []);

  // if (initialLoading) {
  //   return <>Loading...</>;
  // }

  if (chooseInterests) {
    return (
      <form onSubmit={onSubmit}>
        <CategoriesForm
          categories={categories}
          errors={errors}
          isSubmitting={isSubmitting}
          setValue={setValue}
          watch={watch}
        />
      </form>
    );
  }

  return children;
}
