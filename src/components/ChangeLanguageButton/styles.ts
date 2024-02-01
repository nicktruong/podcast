import { tss } from "tss-react/mui";

export const useStyles = tss.create({
  select: {
    "& .MuiSelect-select": {
      padding: "0px",
      margin: "4px 8px 0",
      minHeight: "unset !important",
      paddingRight: "0px !important",
    },
    "& .MuiSelect-icon": {
      display: "none",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  flag: {
    width: "32px",
    height: "20px",
    display: "block",
    objectFit: "cover",
  },
});
