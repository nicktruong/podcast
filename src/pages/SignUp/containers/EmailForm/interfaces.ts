import { Control, FieldErrors } from "react-hook-form";

import type { RegisterData } from "@/common/interfaces";

export interface EmailFormProps {
  control: Control<RegisterData>;
  errors: FieldErrors<RegisterData>;
  nextStepHandler: () => Promise<void>;
}
