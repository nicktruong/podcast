import { Box, Typography } from "@mui/material";

import { usePrepareHook } from "./helpers";
import { PlaylistHeaderProps } from "./interfaces";

const PlaylistHeader = ({ seriesDetail }: PlaylistHeaderProps) => {
  const { classes, titleFontSize, seriesTitleRef, seriesTitleContainerRef } =
    usePrepareHook();

  return (
    <Box component="header" className={classes.headerRoot}>
      <Box className={classes.seriesCoverContainer}>
        <img
          width="232px"
          height="232px"
          src={seriesDetail.coverUrl}
          alt={`${seriesDetail.title} cover photo`}
          className="rounded shadow-white shadow-md"
        />
      </Box>

      <Box className={classes.seriesInfo}>
        <Typography fontSize="14px">Podcast</Typography>
        <Box height="140px" ref={seriesTitleContainerRef}>
          <Typography
            fontWeight={700}
            ref={seriesTitleRef}
            fontSize={titleFontSize}
          >
            {/* TODO: Add skeleton loader */}
            {seriesDetail.title}
          </Typography>
        </Box>
        <Typography fontSize="32px" fontWeight={700}>
          {seriesDetail.author?.name}
        </Typography>
      </Box>
    </Box>
  );
};

export default PlaylistHeader;
