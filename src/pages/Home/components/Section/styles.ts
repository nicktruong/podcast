import { tss } from "tss-react/mui";

export const useStyles = tss.create(({ theme }) => ({
  section: {
    "&:not(:first-of-type)": {
      marginTop: "40px",
    },
  },
  sectionTitle: {
    fontWeight: 700,
    fontSize: "32px",
    textTransform: "capitalize",
    color: theme.palette.text.primary,
  },
  cards: {
    marginTop: "32px",
  },
}));

export type Styles = ReturnType<typeof useStyles>["classes"];
