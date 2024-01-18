import { Control, FieldErrors } from "react-hook-form";

import { Steps } from "../../constants";
import { IRegisterForm } from "../../schema";

export interface PasswordFormProps {
  activeStep: Steps;
  handlePrevStep: () => void;
  control: Control<IRegisterForm>;
  errors: FieldErrors<IRegisterForm>;
  nextStepHandler: () => Promise<void>;
}
