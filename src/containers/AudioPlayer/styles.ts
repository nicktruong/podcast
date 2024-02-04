import { tss } from "tss-react/mui";
import { alpha } from "@mui/material";

export const useStyles = tss.create(({ theme }) => ({
  audioPlayerRoot: {
    gap: "40px",
    height: "80px",
    display: "flex",
    position: "relative",
    padding: "8px 8px 24px 24px",
    background: theme.palette.common.black,
  },
  closeIcon: {
    top: "16px",
    right: "16px",
    cursor: "pointer",
    position: "absolute",
  },
  audioPlayerImage: {
    height: "100%",
    objectFit: "cover",
    borderRadius: "4px",
    aspectRatio: "1 / 1",
  },
  infoContainer: {
    width: "25%",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
  },
  infoGroup: {
    display: "flex",
    overflow: "hidden",
    marginLeft: "16px",
    flexDirection: "column",
    justifyContent: "center",
  },
  infoTitle: {
    fontSize: "14px",
    lineHeight: "18px",
    position: "relative",
    whiteSpace: "nowrap",

    "&:before": {
      left: 0,
      bottom: 0,
      width: "100%",
      height: "100%",
      content: "''",
      position: "absolute",
      background: "linear-gradient(to right, transparent 90%, #000000)",
    },
  },
  infoAuthor: {
    fontSize: "12px",
    lineHeight: "16px",
    color: theme.palette.text.secondary,
  },
  mediaPlayer: {
    width: "50%",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  actions: {
    gap: "24px",
    display: "flex",
    marginRight: "40px",
    alignItems: "center",

    "& > *": {
      cursor: "pointer",
    },
  },
  speed: {
    fontSize: "18px",
  },
  speedIcon: {
    margin: "-2px",
    fontSize: "12px",
  },
  timeskip: {
    fontSize: "20px",
  },
  playIcon: {
    fontSize: "40px",
  },
  slider: {
    flex: 1,

    "& .MuiSlider-thumb": {
      width: "8px",
      height: "8px",
    },
  },
  sliderContainer: {
    gap: "16px",
    width: "100%",
    display: "flex",
    position: "relative",
    alignItems: "center",
  },
  passedDuration: {
    width: "50px",
    flexShrink: 0,
    fontSize: "14px",
  },
  audioDuration: {
    width: "50px",
    flexShrink: 0,
    fontSize: "14px",
  },
  disabled: {
    opacity: "0.5",
    cursor: "not-allowed",
  },
  playbackRateSelect: {
    width: "20px",

    "& .MuiSelect-select": {
      padding: "0px",
      paddingRight: "0px !important",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiSelect-icon": {
      display: "none",
    },
  },
  extras: {
    gap: "8px",
    width: "25%",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
  },
  volumeSlider: {
    width: "100px",

    "& .MuiSlider-thumb": {
      display: "none",
    },
    "& .MuiSlider-track": {
      border: "none",
      color: theme.palette.common.white,
    },
    "& .MuiSlider-rail": {
      color: alpha(theme.palette.common.white, 0.6),
    },
  },
  volumeIcon: {
    cursor: "pointer",
  },
}));
