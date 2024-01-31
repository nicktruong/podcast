import { FieldErrors, UseFormSetValue } from "react-hook-form";

import type { Categories, RegistrationInterests } from "@/common/interfaces";

export interface CategoriesFormProps {
  categories: Categories;
  isSubmitting: boolean;
  chosenCategories: string[];
  errors: FieldErrors<RegistrationInterests>;
  setValue: UseFormSetValue<RegistrationInterests>;
}
