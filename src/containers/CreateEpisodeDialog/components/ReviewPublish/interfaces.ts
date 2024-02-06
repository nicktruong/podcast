import type { EpisodeCreationData, User } from "@/common/interfaces";

export interface ReviewPublishProps {
  podInfo: EpisodeCreationData;
  user: Partial<User> | null;
  image?: string;
}
