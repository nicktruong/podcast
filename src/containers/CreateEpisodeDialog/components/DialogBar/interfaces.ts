import { EpisodeCreationSteps } from "@/enums";

export interface DialogBarProps {
  handleClose: () => void;
  step: EpisodeCreationSteps;
}
