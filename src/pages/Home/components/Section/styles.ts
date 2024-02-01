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
  // playlist: {
  //   gap: "24px",
  //   display: "grid",
  //   marginTop: "8px",
  //   gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  // },
}));

export type Styles = ReturnType<typeof useStyles>["classes"];
