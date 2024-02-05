import { useMediaQuery } from "react-responsive";

export const useMaxWidthScreenMedia = (maxWidth: number) => {
  const isSmaller = useMediaQuery({
    query: `(max-width: ${maxWidth}px)`,
  });

  return { isSmaller };
};
