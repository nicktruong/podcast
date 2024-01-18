import { getDownloadURL, getStorage, ref } from "firebase/storage";

export const downloadAudio = async (path: string) => {
  const storage = getStorage();

  const audioRef = ref(storage, path);

  const url = await getDownloadURL(audioRef);

  return url;
};
