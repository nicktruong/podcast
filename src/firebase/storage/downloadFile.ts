import { getDownloadURL, getStorage, ref } from "firebase/storage";

export const downloadFile = async (path: string) => {
  const storage = getStorage();

  const fileRef = ref(storage, path);

  const url = await getDownloadURL(fileRef);

  return url;
};
