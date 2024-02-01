import { tss } from "tss-react/mui";

export const useStyles = tss.create(({ theme }) => ({
  section: {
    "&:not(:first-of-type)": {
      marginTop: "24px",
    },
  },
  sectionTitle: {
    fontWeight: 700,
    fontSize: "32px",
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
}));

export type Styles = ReturnType<typeof useStyles>["classes"];
