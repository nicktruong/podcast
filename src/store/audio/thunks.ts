import { createAppAsyncThunk } from "@/store/createAppAsyncThunk";
import { downloadFileFromStorage, updatePlayCount } from "@/firebase";

import { selectAudioState } from "./selectors";

export const downloadAndPlayAudio = createAppAsyncThunk(
  "audio/downloadAndPlayAudio",
  async (pathToFile: string) => {
    const audioUrl = await downloadFileFromStorage(pathToFile);

    return audioUrl;
  }
);

export const updateAudioPlayedCount = createAppAsyncThunk(
  "audio/updateAudioPlayedCount",
  async (_, thunkApi) => {
    const { podcastId, episodeId } = selectAudioState(thunkApi.getState());

    await updatePlayCount({ podcastId, episodeId });
  }
);
