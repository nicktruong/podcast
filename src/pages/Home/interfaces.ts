import { PopulatedPodcast } from "@/common/interfaces";
import { ListenerPodcastsState } from "@/store/listenerPodcasts/interfaces";

export interface SectionData {
  title: string;
  podcasts: PopulatedPodcast[];
  key: keyof ListenerPodcastsState["loading"];
}
