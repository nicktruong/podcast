import { createSlice } from "@reduxjs/toolkit";

import { addHistory } from "@/firebase";

import { selectUserId } from "../user";
import { createAppAsyncThunk } from "../createAppAsyncThunk";

import type { HistoryState } from "./interfaces";

const initialState: HistoryState = {
  history: [],
};

export const addHistoryAction = createAppAsyncThunk(
  "history/addHistory",
  async (podcastId: string, thunkApi) => {
    const userId = selectUserId(thunkApi.getState());

    if (!userId) {
      return;
    }

    await addHistory({ userId, podcastId });
  }
);

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
});

export default historySlice.reducer;
