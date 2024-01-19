import { Control, FieldErrors } from "react-hook-form";

import type { EpisodeCreationData } from "@/common/interfaces";

export interface EditDetailsProps {
  control: Control<EpisodeCreationData>;
  errors: FieldErrors<EpisodeCreationData>;
  onSubmit: (e?: React.BaseSyntheticEvent | undefined) => Promise<void>;
}
