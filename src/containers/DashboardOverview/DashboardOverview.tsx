import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";

import { usePrepareHook } from "./helpers";

export default function DashboardOverview() {
  const { user, classes, podcast, episodes, t } = usePrepareHook();

  return (
    <Box className={classes.root}>
      <Box className={classes.podcastInfoContainer}>
        <Box className={classes.podcastInfoImgContainer}>
          <img
            width="280px"
            height="280px"
            src={podcast?.coverUrl}
            className={classes.podcastInfoImg}
            alt={`${podcast?.title} cover photo`}
          />
        </Box>

        <Box className={classes.podcastInfo}>
          <Box className={classes.podcast}>
            <Typography className={classes.podcastHeading}>
              {t("podcast")}
            </Typography>

            <Typography component="h1" className={classes.podcastTitle}>
              {podcast?.title}
            </Typography>

            <Typography className={classes.episodesCount}>
              {user?.episodeCount}{" "}
              {t("episode", { count: user?.episodeCount ?? 1 })}
            </Typography>
          </Box>

          <Box className="mt-12">
            <Button variant="round" className="mr-3">
              {t("share")}
            </Button>
            {/* <Button variant="round">{t("profilePage")}</Button> */}
          </Box>
        </Box>
      </Box>

      <Box className={classes.podcastOverviewContainer}>
        <Box className={classes.podcastOverview}>
          <Typography className={classes.podcastOverviewHeading}>
            {t("podcastOverview")}
          </Typography>

          <Box className={classes.podcastOverviewStats}>
            <Box sx={{ width: "150px" }}>
              <Typography className={classes.statsHeading}>
                {t("plays")}
              </Typography>
              <Typography className={classes.stats}>
                {podcast?.playCount ?? 0}
              </Typography>
              <Typography className={classes.statsNote}>
                {t("allTime")}
              </Typography>
            </Box>

            <Box sx={{ width: "150px" }}>
              <Typography className={classes.statsHeading}>
                {t("audienceSize")}
              </Typography>
              <Typography className={classes.stats}>
                {podcast?.audienceSize ?? 0}
              </Typography>
              <Typography className={classes.statsNote}>
                {t("allTime")}
              </Typography>
            </Box>

            <Box sx={{ width: "150px" }}>
              <Typography className={classes.statsHeading}>
                {t("followers")}
              </Typography>
              <Typography className={classes.stats}>
                {/* TODO: Implement followers */} 0
              </Typography>
              <Typography className={classes.statsNote}>
                {t("growYourAudience")}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className={classes.latestEpisodeContainer}>
          <Typography className={classes.podcastOverviewHeading}>
            {t("latestEpisode")}
          </Typography>

          <Box className={classes.latestEpisode}>
            <Box sx={{ maxWidth: "calc(100% - 96px)" }}>
              <Typography className={classes.statsHeading}>
                {t("plays")}
              </Typography>
              <Typography className={classes.stats}>
                {episodes[0]?.playCount}
              </Typography>
              <Typography className={classes.latestEpisodeTitle}>
                {episodes[0]?.title}
              </Typography>
            </Box>
            <Box className={classes.latestEpisodeImgContainer}>
              <img
                alt={`${episodes[0]?.title} cover photo`}
                className="w-full h-full object-cover rounded"
                src={podcast?.coverUrl}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
