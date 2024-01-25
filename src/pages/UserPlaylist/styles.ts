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
    maxWidth: "300px",
    alignItems: "center",
  },
  img: {
    borderRadius: "4px",
  },
  titleCell: {},
  titleContent: {
    maxWidth: "100%",
  },
  title: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: theme.palette.primary.main,
  },
  author: {
    fontSize: "14px",
    color: theme.palette.text.secondary,
  },
  podcastContainer: {
    maxWidth: "320px",
  },
  podcastTitle: {
    fontSize: "14px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}));
