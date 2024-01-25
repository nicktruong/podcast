import { tss } from "tss-react/mui";

export const useStyles = tss.create(({ theme }) => ({
  categoryRoot: {
    flexGrow: 1,
    width: "100%",
    borderRadius: "8px",
    background: "linear-gradient(to bottom, #222222, #121212)",
  },
  categoryContent: {
    padding: "96px 24px 72px",
  },
  sortByContainer: {
    gap: "8px",
    display: "flex",
    alignItems: "center",
  },
  resultContainer: {
    gap: "24px",
    height: "490px",
    display: "grid",
    marginTop: "8px",
    overflow: "hidden",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",

    "&:last-of-type": {
      marginTop: "32px",
    },
  },
  result: {
    height: "233px",
    padding: "16px",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "all 0.2s ease-in",
    background: theme.palette.custom?.background.main,

    "&:hover": {
      background: theme.palette.custom?.hover.cardBackground,
    },
  },
  resultImg: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    borderRadius: "4px",
  },
  resultInfo: {
    marginTop: "16px",
  },
  resultTitle: {
    fontWeight: 700,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  resultAdditionalInfo: {
    fontSize: "14px",
    color: theme.palette.text.secondary,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}));
