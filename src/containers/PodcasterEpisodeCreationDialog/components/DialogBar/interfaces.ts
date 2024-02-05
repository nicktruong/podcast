import { EpisodeCreationSteps } from "@/common/enums";

export interface DialogBarProps {
  handleClose: () => void;
  step: EpisodeCreationSteps;
}
