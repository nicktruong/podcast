import { Control, FieldErrors } from "react-hook-form";

import type { RegisterData } from "@/common/interfaces";

export interface UserInfoFormProps {
  control: Control<RegisterData>;
  errors: FieldErrors<RegisterData>;
  validateDate: () => Promise<void>;
  nextStepHandler: () => Promise<void>;
}
