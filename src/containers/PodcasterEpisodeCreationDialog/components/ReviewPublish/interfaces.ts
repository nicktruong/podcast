import type { Podcast, UserInfo } from "@/common/interfaces";

export interface ReviewPublishProps {
  podInfo: Podcast;
  user: UserInfo;
  image?: string;
}
