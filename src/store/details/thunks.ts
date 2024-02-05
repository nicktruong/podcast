import {
  getPodcastDetail,
  getEpisodesDetailFromPodcastId,
  getPodcastAndEpisodesDetailFromEpisodeId,
} from "@/firebase";
import { createAppAsyncThunk } from "@/store/createAppAsyncThunk";

export const fetchEpisodesDetail = createAppAsyncThunk(
  "details/fetchEpisodesDetail",
  async (episodeId: string) => {
    // TODO: Consider caching
    const { podcast, episodesDetail } =
      await getPodcastAndEpisodesDetailFromEpisodeId(episodeId);

    return { podcast, episodesDetail };
  }
);

// TODO: Move to playlistsSlice
export const fetchPlaylistEpisodesDetail = createAppAsyncThunk(
  "details/fetchPlaylistEpisodesDetail",
  async (podcastId: string) => {
    // TODO: Consider caching
    const episodesDetail = await getEpisodesDetailFromPodcastId(podcastId);

    return episodesDetail;
  }
);

export const fetchPodcastDetail = createAppAsyncThunk(
  "details/fetchPodcastDetail",
  async (podcastId: string) => {
    // TODO: Consider caching
    const podcastDetail = await getPodcastDetail(podcastId);

    return podcastDetail;
  }
);
