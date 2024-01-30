import { downloadFileFromStorage, updatePlayCount } from "@/firebase";

import { createAppAsyncThunk } from "../createAppAsyncThunk";

import { selectAudioState } from "./selectors";
import {
  DownloadAndPlayAudioParameters,
  DownloadAndPlayAudioReturnType,
} from "./interfaces";

export const downloadAndPlayAudio = createAppAsyncThunk(
  "audio/downloadAndPlayAudio",
  async ({
    title,
    author,
    coverUrl,
    podcastId,
    episodeId,
    pathToFile,
  }: DownloadAndPlayAudioParameters): Promise<
    DownloadAndPlayAudioReturnType | undefined
  > => {
    const audioUrl = await downloadFileFromStorage(pathToFile);

    return { title, author, coverUrl, podcastId, episodeId, audioUrl };
  }
);

export const updateAudioPlayedCount = createAppAsyncThunk(
  "audio/updateAudioPlayedCount",
  async (_, thunkApi) => {
    const { podcastId, episodeId } = selectAudioState(thunkApi.getState());

    await updatePlayCount({ podcastId, episodeId });
  }
);
