import type { PopulatedPodcastWithAuthor } from "@/common/interfaces";

export interface SectionProps {
  title: string;
  podcasts: PopulatedPodcastWithAuthor[];
}
