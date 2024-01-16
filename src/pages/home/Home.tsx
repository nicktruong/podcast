import { Box, Typography } from "@mui/material";

import useHelper from "./useHelper";

export default function Home() {
  const { classes, trendingPodcasts } = useHelper();

  return (
    <Box className={classes.homeRoot}>
      <Box className={classes.homeContent}>
        <Box className={classes.section} component="section">
          <Typography className={classes.homeTitle} component="h2">
            Trending podcasts
          </Typography>

          <Box className={classes.playlist}>
            {trendingPodcasts.map((podcast) => (
              <Box key={podcast.id} className={classes.series}>
                <Box>
                  <img
                    className={classes.seriesImg}
                    src={podcast.coverUrl}
                    alt={`${podcast.title} cover image`}
                  />
                </Box>
                <Box className={classes.seriesInfo}>
                  <Typography className={classes.seriesTitle}>
                    {podcast.title}
                  </Typography>
                  <Typography className={classes.seriesAuthor}>
                    By {podcast.author?.name}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* <Box className={classes.section} component="section">
          <Typography className={classes.homeTitle} component="h2">
            Trending podcasts
          </Typography>

          <Box className={classes.playlist}>
            <Box className={classes.series}>
              <Box>
                <img
                  className={classes.seriesImg}
                  src="https://i.scdn.co/image/ab67656300005f1fa6d1faa400c3a2e93b55f7f7"
                  alt=""
                />
              </Box>
              <Box className={classes.seriesInfo}>
                <Typography className={classes.seriesTitle}>
                  Tencent (CN) | Cá Chép Hóa Rồng | 2/4
                </Typography>
                <Typography className={classes.seriesAuthor}>
                  By Nick Trương
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
}
