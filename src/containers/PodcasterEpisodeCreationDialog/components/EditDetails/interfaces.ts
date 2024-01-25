import { Control, FieldErrors } from "react-hook-form";

import type { EpisodeBasicCreationData } from "@/common/interfaces";

export interface EditDetailsProps {
  control: Control<EpisodeBasicCreationData>;
  errors: FieldErrors<EpisodeBasicCreationData>;
  onSubmit: (e?: React.BaseSyntheticEvent | undefined) => Promise<void>;
}
