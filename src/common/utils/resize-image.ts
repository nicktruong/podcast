import Resizer from "react-image-file-resizer";

export const resizeFile = (
  file: File,
  sizes?: { width: number; height: number }
): Promise<File> => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      sizes?.width ?? 300,
      sizes?.height ?? 300,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri as File);
      },
      "file"
    );
  });
};
