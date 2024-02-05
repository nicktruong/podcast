import { createAsyncThunk } from "@reduxjs/toolkit";

import type { AppDispatch, RootState } from ".";

// For more information, please visit: https://redux-toolkit.js.org/usage/usage-with-typescript#typing-the-thunkapi-object
export type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra?: unknown;
  pendingMeta?: unknown;
  rejectValue?: unknown;
  rejectedMeta?: unknown;
  fulfilledMeta?: unknown;
  serializedErrorType?: unknown;
};

export const createAppAsyncThunk =
  createAsyncThunk.withTypes<AsyncThunkConfig>();
