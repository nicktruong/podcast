import { tss } from "tss-react/mui";

export const useStyles = tss.create({
  select: {
    width: "32px",
    height: "20px",
    margin: "3px 8px 0",
    overflow: "hidden",

    "& .MuiSelect-select": {
      padding: "0px",
      minHeight: "unset !important",
      paddingRight: "0px !important",
    },
    "& .MuiSelect-icon": {
      display: "none",
    },
  },
  flag: {
    width: "32px",
    height: "100%",
    display: "block",
    objectFit: "cover",
  },
});
