import { Box, Typography } from "@mui/material";

import PodcastDetailsHeaderSkeleton from "../PodcastDetailsHeaderSkeleton";

import { usePrepareHook } from "./helpers";

const PodcastDetailsHeader = () => {
  const {
    title,
    classes,
    coverUrl,
    authorName,
    loadingDetail,
    titleFontSize,
    seriesTitleRef,
    seriesTitleContainerRef,
    t,
  } = usePrepareHook();

  if (loadingDetail) {
    return <PodcastDetailsHeaderSkeleton />;
  }

  return (
    <Box component="header" className={classes.headerRoot}>
      <Box className={classes.seriesCoverContainer}>
        <img
          width="232px"
          height="232px"
          src={coverUrl}
          alt={`${title} cover photo`}
          className="max-w-full rounded shadow-white shadow-md"
        />
      </Box>

      <Box className={classes.seriesInfo}>
        <Typography fontSize="14px">{t("playlist")}</Typography>
        <Box ref={seriesTitleContainerRef} className={classes.titleContainer}>
          <Typography
            fontWeight={700}
            ref={seriesTitleRef}
            fontSize={titleFontSize}
            className={classes.title}
          >
            {/* TODO: Add skeleton loader */}
            {title}
          </Typography>
        </Box>
        <Typography fontSize="32px" fontWeight={700} className={classes.author}>
          {authorName}
        </Typography>
      </Box>
    </Box>
  );
};

export default PodcastDetailsHeader;
