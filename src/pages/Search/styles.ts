import { tss } from "tss-react/mui";

export const useStyles = tss.create(({ theme }) => ({
  searchRoot: {
    flexGrow: 1,
    width: "100%",
    borderRadius: "8px",
    background: theme.palette.custom?.background.gradient,
  },
  searchContent: {
    padding: "96px 24px 72px",
  },
  searchHeading: {
    fontWeight: 700,
    fontSize: "24px",
  },
  categories: {
    gap: "12px",
    display: "flex",
    flexWrap: "wrap",
    marginTop: "16px",
  },
  category: {
    width: "206px",
    cursor: "pointer",
    overflow: "hidden",
    borderRadius: "8px",
    aspectRatio: "1 / 1",
    position: "relative",
  },
  categoryTitle: {
    fontWeight: 700,
    fontSize: "24px",
    padding: "8px 16px",
    wordWrap: "break-word",
  },
  categoryImg: {
    right: 0,
    bottom: 0,
    position: "absolute",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)",
    transform: "rotate(25deg) translate(18%,-2%)",
  },
  resultContainer: {
    gap: "24px",
    height: "233px",
    display: "grid",
    marginTop: "8px",
    overflow: "hidden",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  },
  section: {
    "&:not(:first-of-type)": {
      marginTop: "32px",
    },
  },
  result: {
    padding: "16px",
    cursor: "pointer",
    borderRadius: "8px",
    background: theme.palette.custom?.background.main,
    transition: "all 0.2s ease-in",

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
