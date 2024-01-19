import { Box, Typography } from "@mui/material";
import PodcastsIcon from "@mui/icons-material/Podcasts";

export default function Logo() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        columnGap: "2px",
        fontSize: "1.25rem",
        lineHeight: "1.75rem",
      }}
    >
      <PodcastsIcon sx={{ width: "32px", height: "32px" }} />
      <Typography
        sx={{
          fontWeight: "bold",
          letterSpacing: "-0.05em",
          fontSize: "1.25rem",
          lineHeight: "1.75rem",
        }}
        component="span"
      >
        GO Podcast
      </Typography>
    </Box>
  );
}
