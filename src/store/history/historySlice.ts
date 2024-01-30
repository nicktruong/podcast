import { createSlice } from "@reduxjs/toolkit";

import type { HistoryState } from "./interfaces";

const initialState: HistoryState = {
  history: [],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
});

export default historySlice.reducer;
