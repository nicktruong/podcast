import { formatDistance } from "date-fns";
import { Box, Typography } from "@mui/material";

import { usePrepare } from "./usePrepare";

const Notification = () => {
  const { classes, notifications } = usePrepare();

  return (
    <Box className={classes.notificationRoot}>
      <Box className={classes.notificationContent}>
        <Box>
          <Typography className={classes.notificationHeading}>
            Notifications
          </Typography>
        </Box>

        <Box className={classes.notifications}>
          {notifications.length === 0 && (
            <Typography className={classes.notification}>
              You have no notification
            </Typography>
          )}

          {notifications.map((notification) => (
            <Box key={notification.id} className={classes.notification}>
              <img
                className={classes.avatar}
                src={notification.creatorAvatar}
                alt={`${notification.creatorName} cover photo`}
              />
              <Box>
                <div
                  className={classes.notificationTitle}
                  dangerouslySetInnerHTML={{ __html: notification.title }}
                />
                <Box className={classes.time}>
                  {formatDistance(
                    new Date(notification.createdAt),
                    new Date(),
                    { addSuffix: true }
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Notification;
