import { GoPerson } from "react-icons/go";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { routes } from "@/common/constants";

import { usePrepare } from "./usePrepare";

const Profile = () => {
  const { classes, playlists, episodes, user, isMyProfile } = usePrepare();

  return (
    <Box className={classes.profileRoot}>
      <Box className={classes.profileContent}>
        <Box component="header" className={classes.headerRoot}>
          <Box className={classes.seriesCoverContainer}>
            <Box className={classes.userAvatarContainer}>
              {user?.photoURL ? (
                <img
                  width="232px"
                  height="232px"
                  src={user?.photoURL}
                  className={classes.userAvatar}
                  alt={`${user?.name} avatar`}
                  // TODO: ignore google photo
                />
              ) : (
                <GoPerson className={classes.avatarIcon} />
              )}
            </Box>
          </Box>
          <Box className={classes.userInfo}>
            <Typography className={classes.profile}>Profile</Typography>
            <Typography className={classes.username}>{user?.name}</Typography>
          </Box>
        </Box>

        {isMyProfile ? (
          <Link to={routes.editProfile}>
            <Box className={classes.editAction}>
              <EditIcon className={classes.editIcon} />
              <Typography>Edit Profile</Typography>
            </Box>
          </Link>
        ) : null}

        {playlists.length > 0 && (
          <Box className={classes.playlists}>
            <Typography className={classes.playlistsHeading}>
              Public Playlists
            </Typography>

            <Box className={classes.playlist}>
              {playlists.map((podcast) => (
                <Link
                  key={podcast.id}
                  className={classes.series}
                  to={routes.playlist.replace(":id", podcast.id)}
                >
                  <Box>
                    <img
                      className={classes.seriesImg}
                      src={podcast.coverUrl}
                      alt={`${podcast.title} cover photo`}
                    />
                  </Box>
                  <Box className={classes.seriesInfo}>
                    <Typography className={classes.seriesTitle}>
                      {podcast.title}
                    </Typography>
                    <Typography className={classes.seriesAuthor}>
                      By {user?.name}
                    </Typography>
                  </Box>
                </Link>
              ))}
            </Box>
          </Box>
        )}

        {episodes.length > 0 && (
          <Box className={classes.playlists}>
            <Typography className={classes.playlistsHeading}>
              Episodes Published
            </Typography>

            <Box className={classes.playlist}>
              {episodes.map((episode) => (
                <Link
                  key={episode.id}
                  className={classes.series}
                  to={routes.playlist.replace(":id", episode.id)}
                >
                  <Box>
                    <img
                      className={classes.seriesImg}
                      src={episode.podcast.coverUrl}
                      alt={`${episode.title} cover photo`}
                    />
                  </Box>
                  <Box className={classes.seriesInfo}>
                    <Typography className={classes.seriesTitle}>
                      {episode.title}
                    </Typography>
                    <Typography className={classes.seriesAuthor}>
                      By {user?.name}
                    </Typography>
                  </Box>
                </Link>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
