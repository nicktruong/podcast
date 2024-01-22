import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AsyncThunkConfig } from "@/hooks";
import { PodcastSeriesDetail } from "@/common/interfaces";
import { addHistory } from "@/firebase/history/addHistory";

import { selectUserId } from "../user";

import { HistoryState } from "./interfaces";

const initialState: HistoryState = {
  history: [],
};

export const addHistoryAction = createAsyncThunk<
  void,
  { seriesDetail: PodcastSeriesDetail },
  AsyncThunkConfig
>("history/addHistory", async ({ seriesDetail }, thunkApi) => {
  const userId = selectUserId(thunkApi.getState());

  await addHistory({ userId, seriesDetail });
});

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
});

export default historySlice.reducer;
