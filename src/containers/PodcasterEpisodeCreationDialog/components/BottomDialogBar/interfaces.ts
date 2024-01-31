import { EPISODE_CREATION_STEPS } from "@/common/enums";

export interface BottomDialogBarProps {
  podUploading: boolean;
  step: EPISODE_CREATION_STEPS;
  handleCancel: () => void;
  handleStepBack: () => void;
  podUploadingProgress: number;
  handleNext: () => Promise<void>;
}
