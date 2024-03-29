import { createAppAsyncThunk } from "@/store/createAppAsyncThunk";
import { downloadFile, updatePlayCount } from "@/firebase";

import { selectUserId } from "../user";

import { selectAudioState } from "./selectors";

export const downloadAndPlayAudio = createAppAsyncThunk(
  "audio/downloadAndPlayAudio",
  async (pathToFile: string) => {
    const audioUrl = await downloadFile(pathToFile);

    return audioUrl;
  }
);

export const updateAudioPlayedCount = createAppAsyncThunk(
  "audio/updateAudioPlayedCount",
  async (_, thunkApi) => {
    const { podcastId, episodeId } = selectAudioState(thunkApi.getState());
    const userId = selectUserId(thunkApi.getState());

    await updatePlayCount({ podcastId, episodeId, userId });
  }
);
