import Resizer from "react-image-file-resizer";

/**
 * Resizes an image file to the specified dimensions.
 * @param {File} file - The image file to resize.
 * @param {Object} [sizes] - An optional object specifying the desired width and height of the resized image.
 * @param {number} [sizes.width=300] - The desired width of the resized image in pixels.
 * @param {number} [sizes.height=300] - The desired height of the resized image in pixels.
 * @returns {Promise<File>} A Promise that resolves with a new File object representing the resized image.
 * @example
 * import { resizeImage } from './resizeImage';
 * const imageFile = document.querySelector('input[type="file"]').files[0];
 * resizeImage(imageFile, { width: 600, height: 400 })
 * .then((resizedImage) => {
 * // Use the resizedImage File object here
 * })
 */
export const resizeImage = (
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
