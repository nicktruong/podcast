import { FieldErrors, UseFormSetValue } from "react-hook-form";

import type { Category, RegistrationInterests } from "@/common/interfaces";

export interface CategoriesFormProps {
  categories: Category;
  isSubmitting: boolean;
  chosenCategories: string[];
  errors: FieldErrors<RegistrationInterests>;
  setValue: UseFormSetValue<RegistrationInterests>;
}
