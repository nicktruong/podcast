import { getBlob, getStorage, ref } from "firebase/storage";

export const downloadPhotoFromStorage = async (path: string) => {
  const storage = getStorage();

  const photoRef = ref(storage, path);

  return getBlob(photoRef);
};
