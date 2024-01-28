import { tss } from "tss-react/mui";

export const useStyles = tss.create({
  select: {
    "& .MuiSelect-select": {
      padding: "2px",
      paddingRight: "2px !important",
    },
    "& .MuiSelect-icon": {
      display: "none",
    },
  },
  flag: {
    width: "32px",
    height: "20px",
    display: "block",
  },
});
