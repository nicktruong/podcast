import { ListenerPodcastsState } from "@/store/listenerPodcasts/interfaces";

import type { PopulatedPodcastWithAuthor } from "@/common/interfaces";

export interface SectionData {
  title: string;
  podcasts: PopulatedPodcastWithAuthor[];
  key: keyof ListenerPodcastsState["loading"];
  requireLogin?: boolean;
}
