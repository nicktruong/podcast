import { Control, FieldErrors } from "react-hook-form";

import { IRegisterForm } from "../../schema";

export interface EmailFormProps {
  control: Control<IRegisterForm>;
  errors: FieldErrors<IRegisterForm>;
  nextStepHandler: () => Promise<void>;
}
