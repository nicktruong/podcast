import { useMediaQuery } from "react-responsive";

export const useSmallScreen = () => {
  const isSmallScreen = useMediaQuery({
    query: "(max-width: 560px)",
  });

  return { isSmallScreen };
};
