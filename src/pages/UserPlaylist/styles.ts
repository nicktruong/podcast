import { tss } from "tss-react/mui";

export const useStyles = tss.create(({ theme }) => ({
  content: {
    marginTop: "24px",
  },
  firstColumn: {
    width: "40px",
    paddingRight: "0px",
  },
  icon: {
    fontSize: "16px",
  },
  titleContainer: {
    gap: "12px",
    display: "flex",
    alignItems: "center",
  },
  img: {
    borderRadius: "4px",
  },
  titleCell: {},
  title: {
    color: theme.palette.primary.main,
  },
  author: {
    fontSize: "14px",
    color: theme.palette.text.secondary,
  },
  podcastTitle: {
    fontSize: "14px",
  },
}));
