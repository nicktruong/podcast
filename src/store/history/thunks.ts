import { addHistory } from "@/firebase";
import { createAppAsyncThunk } from "@/store/createAppAsyncThunk";

import type { PodcastUserIdPair } from "@/common/interfaces";

export const addHistoryAction = createAppAsyncThunk(
  "history/addHistory",
  async ({ podcastId, userId }: PodcastUserIdPair) => {
    await addHistory({ userId, podcastId });
  }
);
