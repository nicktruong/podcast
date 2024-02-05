import { Box, Typography } from "@mui/material";

import PodcastDetailsHeaderSkeleton from "../PodcastDetailsHeaderSkeleton";

import { usePrepare } from "./usePrepare";

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
  } = usePrepare();

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
          className="rounded shadow-white shadow-md"
        />
      </Box>

      <Box className={classes.seriesInfo}>
        <Typography fontSize="14px">{t("podcast")}</Typography>
        <Box height="120px" ref={seriesTitleContainerRef}>
          <Typography
            className={classes.title}
            fontWeight={700}
            ref={seriesTitleRef}
            fontSize={titleFontSize}
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
