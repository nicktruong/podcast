import { tss } from "tss-react/mui";

export const useStyles = tss.withNestedSelectors().create(({ classes }) => ({
  categoriesContainer: {
    gap: "12px",
    height: "360px",
    display: "grid",
    overflowY: "auto",
    gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
  },
  category: {
    cursor: "pointer",
    borderRadius: "4px",
    position: "relative",

    "&:hover": {
      [`.${classes.categoryBackground}`]: {
        boxShadow: "rgba(255, 255, 255, 0.25) 0px 10px 30px",
      },
    },
  },
  chosenCategory: {
    [`& :not(.${classes.checkIcon}):not(.${classes.checkIcon} > path)`]: {
      opacity: "0.7",
    },
  },
  categoryBackground: {
    width: "100%",
    aspectRatio: "1 / 1",
    borderRadius: "16px",
    transition: "all 0.2s ease-in",
    boxShadow: "rgba(255, 255, 255, 0.15) 0px 5px 15px",
  },
  categoryName: {
    top: "50%",
    left: "50%",
    width: "100%",
    fontWeight: 600,
    fontSize: "14px",
    textAlign: "center",
    position: "absolute",
    wordWrap: "break-word",
    transform: "translate(-50%, -50%)",
  },
  checkIcon: {
    zIndex: 1,
    top: "50%",
    left: "50%",
    display: "none",
    fontSize: "56px",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  },
  block: {
    display: "block",
  },
  formHelperText: {
    marginX: 0,
    display: "flex",
    columnGap: "2px",
  },
  errorMessage: {
    fontWeight: 600,
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
}));
