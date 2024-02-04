import { Link } from "react-router-dom";
import { GoPerson } from "react-icons/go";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Typography } from "@mui/material";

import { routes } from "@/common/constants";

import CardGroup from "../Home/components/CardGroup";

import { usePrepareHook } from "./helpers";

const Profile = () => {
  const { classes, playlists, episodes, user, isMyProfile } = usePrepareHook();

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
            <Typography className={classes.bio}>{user?.bio}</Typography>
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
              <CardGroup
                podcasts={playlists.map((playlist) => ({
                  id: playlist.id,
                  title: playlist.title,
                  coverUrl: playlist.coverUrl,
                  createdAt: playlist.createdAt,
                  author: { name: user?.name ?? "" },
                }))}
              />
            </Box>
          </Box>
        )}
        {episodes.length > 0 && (
          <Box className={classes.playlists}>
            <Typography className={classes.playlistsHeading}>
              Episodes Published
            </Typography>
            <Box className={classes.playlist}>
              <CardGroup
                podcasts={episodes.map((episode) => ({
                  id: episode.id,
                  title: episode.title,
                  createdAt: episode.createdAt,
                  coverUrl: episode.pathToImgFile,
                  author: { name: user?.name ?? "" },
                }))}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
