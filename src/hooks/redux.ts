import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "@/store";
import type { TypedUseSelectorHook } from "react-redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// For more information, please visit: https://redux-toolkit.js.org/usage/usage-with-typescript#typing-the-thunkapi-object
export type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};
