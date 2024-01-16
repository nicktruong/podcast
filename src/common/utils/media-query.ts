import { useMediaQuery } from "react-responsive";

export const isSmallScreen = () => {
  const isSmall = useMediaQuery({
    query: "(max-width: 560px)",
  });

  return isSmall;
};
