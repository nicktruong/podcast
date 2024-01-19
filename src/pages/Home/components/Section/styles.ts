import { tss } from "tss-react/mui";

export const useStyles = tss.create(({ theme }) => ({
  section: {
    "&:not(:first-of-type)": {
      marginTop: "24px",
    },
  },
  sectionTitle: {
    fontWeight: 700,
    fontSize: "24px",
    color: theme.palette.text.primary,
  },
  playlist: {
    gap: "24px",
    height: "233px",
    display: "grid",
    marginTop: "8px",
    overflow: "hidden",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  },
  series: {
    padding: "16px",
    cursor: "pointer",
    borderRadius: "8px",
    background: "#181818",
    transition: "all 0.2s ease-in",

    "&:hover": {
      background: "#282828",
    },
  },
  seriesImg: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    borderRadius: "4px",
  },
  seriesInfo: {
    marginTop: "16px",
  },
  seriesTitle: {
    fontWeight: 700,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  seriesAuthor: {
    fontSize: "14px",
    color: theme.palette.text.secondary,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}));

export type Styles = ReturnType<typeof useStyles>["classes"];
