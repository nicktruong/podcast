import { Control, FieldErrors } from "react-hook-form";

import { Steps } from "../../constants";
import { IRegisterForm } from "../../schema";

export interface UserInfoFormProps {
  activeStep: Steps;
  handlePrevStep: () => void;
  control: Control<IRegisterForm>;
  validateDate: () => Promise<void>;
  errors: FieldErrors<IRegisterForm>;
}
