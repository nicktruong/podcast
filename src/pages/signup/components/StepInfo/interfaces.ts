import { Steps } from "../../constants";

export interface StepInfoProps {
  steps: string[];
  activeStep: Steps;
  handlePrevStep: () => void;
}
