import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PodcastCreationSteps } from "@/common/enums";

import {
  uploadPodcastCover,
  createPodcastAction,
  fetchSinglePodcastOfCreatorId,
} from "./thunks";

import type { PodcastBasicInfo } from "@/common/interfaces";
import type { PodcasterManagePodcastState } from "./interfaces";

const initialState: PodcasterManagePodcastState = {
  tempImg: "",
  podcast: null, // for storing podcast
  loading: true, // fetching process
  podcastCreationData: null,
  step: PodcastCreationSteps.INPUT_DETAILS,
};

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
      state.step = PodcastCreationSteps.UPLOAD_COVER_IMG;
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
        state.step = PodcastCreationSteps.CONFIRM_DETAILS_AND_CREATE;
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
        state.step = PodcastCreationSteps.INPUT_DETAILS;
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

export const { setSeriesDetails } = podSeriesSlice.actions;

export default podSeriesSlice.reducer;
