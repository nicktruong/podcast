import { tss } from "tss-react/mui";

export const useStyles = tss.create({
  cardSkeleton: {},
  imgSkeleton: {
    width: "100%",
    height: "unset",
    aspectRatio: "1/1",
  },
  categoryBtnSkeleton: {
    width: "100px",
    height: "30px",
    marginTop: "20px",
  },
  titleSkeleton: {
    marginTop: "12px",

    "&:not(:first-of-type)": {
      marginTop: "0px",
    },
  },
  createdAtSkeleton: {
    width: "130px",
    height: "21px",
    marginTop: "12px",
  },
});
