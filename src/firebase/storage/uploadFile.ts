import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

export const uploadFile = (path: string, file: File) => {
  const storage = getStorage();

  const fileRef = ref(storage, `${path}/${file.name}`);

  return {
    fullPath: fileRef.fullPath,
    uploadTask: uploadBytesResumable(fileRef, file),
  };
};
