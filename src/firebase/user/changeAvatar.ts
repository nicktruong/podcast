import { getDownloadURL, getStorage, ref } from "firebase/storage";

import { uploadFile } from "../storage";

export const changeAvatar = async (file: File) => {
  const { fullPath } = uploadFile("avatar", file);

  const storage = getStorage();

  const photoRef = ref(storage, fullPath);

  return getDownloadURL(photoRef);
};
