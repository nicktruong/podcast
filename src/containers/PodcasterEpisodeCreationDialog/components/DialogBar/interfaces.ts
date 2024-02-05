import { EPISODE_CREATION_STEPS } from "@/common/enums";

export interface DialogBarProps {
  handleClose: () => void;
  step: EPISODE_CREATION_STEPS;
}
