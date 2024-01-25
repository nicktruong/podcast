import { PopulatedPodcast } from "@/common/interfaces";
import { ListenerPodcastState } from "@/store/listenerPodcastSeries/interfaces";

export interface SectionData {
  title: string;
  podcasts: PopulatedPodcast[];
  key: keyof ListenerPodcastState["loading"];
}
