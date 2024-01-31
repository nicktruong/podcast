import { Fragment } from "react";
import { Box, Button, Skeleton, Typography, alpha } from "@mui/material";
import { formatDistance } from "date-fns";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Link } from "react-router-dom";

import { isDark } from "@/common/utils";
import { routes } from "@/common/constants";

import usePrepare from "./usePrepare";
import { Section, SectionSkeleton } from "./components";

export default function Home() {
  const {
    user,
    classes,
    loading,
    sections,
    standoutPodcast,
    standoutCategory,
    isLoadingStandoutPodcast,
  } = usePrepare();

  return (
    <Box className={classes.homeRoot}>
      <Box className={classes.homeContent}>
        {isLoadingStandoutPodcast ? (
          <Box>
            <Skeleton
              animation="wave"
              variant="rounded"
              className={classes.standoutPodcastHeadingSkeleton}
            />
            <Box className={classes.standoutPodcastContainer}>
              <Box className={classes.standoutPodcast}>
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  className={classes.standoutPodcastImgSkeleton}
                />
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  className={classes.categoryBtnSkeleton}
                />
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  className={classes.standoutPodcastTitleSkeleton}
                />
                <Box className={classes.standoutPodcastDescSkeleton}>
                  {new Array(5).fill(0).map((_, index) => (
                    <Skeleton key={index} animation="wave" />
                  ))}
                </Box>
              </Box>

              <Box className={classes.episodesContainer}>
                <Box className={classes.episodes}>
                  {new Array(3).fill(0).map((_, index) => (
                    <Box className={classes.episode} key={index}>
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        className={classes.episodeCoverSkeleton}
                      />
                      <Box className={classes.episodeInfo}>
                        <Skeleton
                          animation="wave"
                          variant="rounded"
                          className={classes.episodeCreatedAtSkeleton}
                        />
                        <Skeleton
                          animation="wave"
                          variant="rounded"
                          className={classes.episodeTitleSkeleton}
                        />
                        <Box>
                          <Skeleton
                            animation="wave"
                            className={classes.episodeDescSkeleton}
                          />
                          <Skeleton
                            animation="wave"
                            className={classes.episodeDescSkeleton}
                          />
                          <Skeleton
                            animation="wave"
                            className={classes.episodeDescSkeleton}
                          />
                          <Skeleton
                            animation="wave"
                            variant="circular"
                            className={classes.playIconSkeleton}
                          />
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography className={classes.standoutPodcastHeading}>
              Standout podcast
            </Typography>
            <Box className={classes.standoutPodcastContainer}>
              <Box className={classes.standoutPodcast}>
                <img
                  src={standoutPodcast?.coverUrl}
                  className={classes.standoutPodcastImg}
                  alt={`${standoutPodcast?.title} cover photo`}
                />
                <Button
                  component={Link}
                  className={classes.categoryBtn}
                  to={routes.category.replace(":name", standoutCategory.name)}
                  sx={(theme) => ({
                    color: isDark(standoutCategory.color)
                      ? theme.palette.common.white
                      : theme.palette.common.black,
                    borderColor: alpha(standoutCategory.color, 0),
                    backgroundColor: alpha(standoutCategory.color, 0.6),

                    "&:hover": {
                      borderColor: alpha(standoutCategory.color, 0),
                      backgroundColor: alpha(standoutCategory.color, 0.8),
                    },
                  })}
                >
                  {standoutPodcast?.category}
                </Button>
                <Link
                  className={classes.standoutPodcastTitle}
                  to={routes.playlist.replace(":id", standoutPodcast?.id ?? "")}
                >
                  {standoutPodcast?.title}
                </Link>
                <Typography className={classes.standoutPodcastDesc}>
                  {standoutPodcast?.description}
                </Typography>
              </Box>

              <Box className={classes.episodesContainer}>
                <Box className={classes.episodes}>
                  {standoutPodcast?.episodes.map((episode) => (
                    <Box className={classes.episode} key={episode.id}>
                      {/* TODO: Add episode cover photo */}
                      <img
                        alt=""
                        src={episode.pathToImgFile}
                        className={classes.episodeCover}
                      />

                      <Box className={classes.episodeInfo}>
                        <Typography className={classes.episodeCreatedAt}>
                          {formatDistance(
                            new Date(episode.createdAt),
                            new Date(),
                            {
                              addSuffix: true,
                            }
                          )}
                        </Typography>
                        <Link
                          className={classes.episodeTitle}
                          to={routes.episode.replace(":id", episode.id)}
                        >
                          #{episode.no}: {episode.title}
                        </Link>
                        <Typography className={classes.episodeDesc}>
                          {episode.description}
                        </Typography>
                        <PlayCircleIcon className={classes.playIcon} />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        )}

        <Box className={classes.section}>
          {sections.map(({ key, title, podcasts, requireLogin }) => {
            if (!user && requireLogin) return <Fragment key={key} />;

            if (user?.history?.length === 0 && key === "recentlyPlayed") {
              return <Fragment key={key} />;
            }

            if (podcasts.length && !loading[key]) {
              return <Section key={key} title={title} podcasts={podcasts} />;
            }

            return <SectionSkeleton key={key} />;
          })}
        </Box>
      </Box>
    </Box>
  );
}
