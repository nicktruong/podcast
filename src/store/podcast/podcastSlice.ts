import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import {
  uploadFile,
  createPodcast,
  getSinglePodcastOfCreatorId,
} from "@/firebase";
import { resizeImage } from "@/common/utils";
import { PODCAST_CREATION_STEPS } from "@/common/enums";

import { selectUserId } from "../user/userSlice";
import { createAppAsyncThunk } from "../createAppAsyncThunk";

import type { RootState } from "@/store";
import type { PodcastBasicInfo } from "@/common/interfaces";
import type { PodcasterManagePodcastState } from "./interfaces";

const initialState: PodcasterManagePodcastState = {
  tempImg: "",
  podcast: null, // for storing podcast
  loading: false, // fetching process
  podcastCreationData: null,
  step: PODCAST_CREATION_STEPS.INPUT_DETAILS,
};

// TODO: Cron job to clean img if not used for series
export const uploadPodcastCover = createAsyncThunk(
  "podSeries/uploadCover",
  async (file: File) => {
    const image = await resizeImage(file, { width: 300, height: 300 });

    const { fullPath } = uploadFile("photos", image);

    const src = URL.createObjectURL(file);

    return { fullPath, image: src };
  }
);

export const createPodcastAction = createAppAsyncThunk(
  "podSeries/create",
  async (_, thunkApi) => {
    const userId = selectUserId(thunkApi.getState());
    const podcastCreationData = selectPodcastCreationData(thunkApi.getState());

    if (!userId || !podcastCreationData) {
      return;
    }

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

export const podSeriesSlice = createSlice({
  name: "podSeries",
  initialState,
  reducers: {
    setSeriesDetails: (state, action: PayloadAction<PodcastBasicInfo>) => {
      state.podcastCreationData = {
        authorId: "",
        coverUrl: "",
        ...action.payload,
      };
      state.step = PODCAST_CREATION_STEPS.UPLOAD_COVER_IMG;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(uploadPodcastCover.fulfilled, (state, { payload }) => {
        if (!state.podcastCreationData) {
          return;
        }

        state.tempImg = payload.image;
        state.podcastCreationData.coverUrl = payload.fullPath;
        state.step = PODCAST_CREATION_STEPS.CONFIRM_DETAILS_AND_CREATE;
      })
      .addCase(uploadPodcastCover.rejected, (state, { error }) => {
        console.error(error);
      });

    builder
      .addCase(createPodcastAction.fulfilled, (state, { payload }) => {
        if (!payload) {
          return;
        }

        state.podcast = { ...payload, coverUrl: state.tempImg };
        state.step = PODCAST_CREATION_STEPS.INPUT_DETAILS;
      })
      .addCase(createPodcastAction.rejected, (_, { error }) => {
        console.error(error);
      });

    builder
      .addCase(fetchSinglePodcastOfCreatorId.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSinglePodcastOfCreatorId.fulfilled,
        (state, { payload }) => {
          state.loading = false;

          if (payload) {
            state.podcast = payload;
          }
        }
      )
      .addCase(fetchSinglePodcastOfCreatorId.rejected, (state, { error }) => {
        console.error({ error });
        state.loading = false;
      });
  },
});

export const selectLoadingPodcastOfCreator = (state: RootState) =>
  state.podSeries.loading;

export const selectPodcastCreationData = (state: RootState) =>
  state.podSeries.podcastCreationData;

export const selectStep = (state: RootState) => state.podSeries.step;

export const selectPodcast = (state: RootState) => state.podSeries.podcast;

export const selectTempImg = (state: RootState) => state.podSeries.tempImg;

export const { setSeriesDetails } = podSeriesSlice.actions;

export default podSeriesSlice.reducer;
