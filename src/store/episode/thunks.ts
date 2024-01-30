import { populateEpisode } from "@/firebase/utils";
import { createAppAsyncThunk } from "@/store/createAppAsyncThunk";
import { publishEpisode, getEpisodesFromCreatorPaged } from "@/firebase";

import { selectPodcast } from "../podcast";

import { selectEpisodeInfo, selectUploading } from "./selectors";

import type { FetchEpisodesFromCreatorOptions } from "./interfaces";

export const fetchEpisodesFromCreatorPaged = createAppAsyncThunk(
  "episode/fetchEpisodesPagedFromCreator",
  async ({ offset, pageSize, creatorId }: FetchEpisodesFromCreatorOptions) => {
    const episodes = await getEpisodesFromCreatorPaged({
      offset,
      pageSize,
      creatorId,
    });

    return episodes;
  }
);

export const publishEpisodeAction = createAppAsyncThunk(
  "episode/publish",
  async (userId: string, thunkApi) => {
    if (selectUploading(thunkApi.getState()) === true) {
      return thunkApi.rejectWithValue("Please wait. Uploading audio...");
    }

    const podcast = selectPodcast(thunkApi.getState());

    if (!podcast) {
      return thunkApi.rejectWithValue("Please create podcast first!");
    }

    const episode = selectEpisodeInfo(thunkApi.getState());

    const newEpisode = await publishEpisode(episode, userId, podcast.id);

    return populateEpisode(newEpisode);
  }
);
