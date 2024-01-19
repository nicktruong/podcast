import { Control, FieldErrors } from "react-hook-form";

import type { RegisterData } from "@/common/interfaces";

export interface PasswordFormProps {
  control: Control<RegisterData>;
  errors: FieldErrors<RegisterData>;
  nextStepHandler: () => Promise<void>;
}
