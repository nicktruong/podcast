import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  uploadFile,
  createPodcast,
  getSinglePodcastOfCreatorId,
} from "@/firebase";
import { resizeImage } from "@/utils";
import { createAppAsyncThunk } from "@/store/createAppAsyncThunk";
import { IMAGE_SIZE } from "@/constants";

import { selectPodcastCreationData } from "./selectors";

// TODO: Cron job to clean img if not used for series
export const uploadPodcastCover = createAsyncThunk(
  "podSeries/uploadCover",
  async ({ userId, file }: { userId: string; file: File }) => {
    const image = await resizeImage(file, {
      width: IMAGE_SIZE,
      height: IMAGE_SIZE,
    });

    const { fullPath } = uploadFile(`photos/${userId}`, image);

    const src = URL.createObjectURL(file);

    return { fullPath, image: src };
  }
);

export const createPodcastAction = createAppAsyncThunk(
  "podSeries/create",
  async (userId: string, thunkApi) => {
    const podcastCreationData = selectPodcastCreationData(thunkApi.getState());

    if (!podcastCreationData) return;

    const podcast = await createPodcast({
      ...podcastCreationData,
      authorId: userId,
    });

    return podcast;
  }
);

export const fetchSinglePodcastOfCreatorId = createAsyncThunk(
  "creatorPodcast/fetchSinglePodcastOfCreator",
  async (creatorId: string) => {
    const podcast = await getSinglePodcastOfCreatorId(creatorId);

    return podcast;
  }
);
