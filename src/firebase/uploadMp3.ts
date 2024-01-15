import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

export const uploadMp3 = (file: File) => {
  const storage = getStorage();

  const mp3Ref = ref(storage, `files/${file.name}`);

  return {
    fullPath: mp3Ref.fullPath,
    uploadTask: uploadBytesResumable(mp3Ref, file),
  };
};
