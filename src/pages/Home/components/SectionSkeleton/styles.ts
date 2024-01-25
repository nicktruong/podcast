import { tss } from "tss-react/mui";

export const useStyles = tss.create(({ theme }) => ({
  skeletonSection: {
    "&:not(:first-of-type)": {
      marginTop: "24px",
    },
  },
  titleSkeleton: {
    width: "230px",
    height: "36px",
  },
  cardSkeletonContainer: {
    gap: "24px",
    height: "233px",
    display: "grid",
    marginTop: "8px",
    overflow: "hidden",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  },
  cardSkeleton: {
    width: "100%",
    height: "233px",
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: theme.palette.custom?.background.main,
  },
  imgSkeleton: {
    width: "100%",
    height: "140px",
    borderRadius: "8px",
  },
  textSkeletonContainer: {
    marginTop: "16px",
  },
  podcastTitleSkeleton: {
    height: "24px",
  },
  authorNameSkeleton: {
    height: "21px",
  },
}));
