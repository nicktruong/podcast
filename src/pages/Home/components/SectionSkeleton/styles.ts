import { tss } from "tss-react/mui";

export const useStyles = tss.create({
  skeletonSection: {
    "&:not(:first-of-type)": {
      marginTop: "24px",
    },
  },
});
