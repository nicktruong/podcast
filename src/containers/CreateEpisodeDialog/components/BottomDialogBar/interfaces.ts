import { EpisodeCreationSteps } from "@/enums";

export interface BottomDialogBarProps {
  podUploading: boolean;
  step: EpisodeCreationSteps;
  handleCancel: () => void;
  handleStepBack: () => void;
  podUploadingProgress: number;
  handleNext: () => Promise<void>;
}
