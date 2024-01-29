import { Box, Typography } from "@mui/material";
import PodcastsIcon from "@mui/icons-material/Podcasts";

export default function Logo({ hideText }: { hideText?: boolean }) {
  return (
    <Box
      sx={{
        display: "flex",
        columnGap: "2px",
        fontSize: "1.25rem",
        alignItems: "center",
        lineHeight: "1.75rem",
      }}
    >
      <PodcastsIcon sx={{ width: "32px", height: "32px" }} />
      {!hideText && (
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1.25rem",
            lineHeight: "1.75rem",
            letterSpacing: "-0.05em",
          }}
          component="span"
        >
          GO Podcast
        </Typography>
      )}
    </Box>
  );
}
