import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Modal, Rating, Typography } from "@mui/material";

import { usePrepare } from "./usePrepare";
import { PodcastRatingProps } from "./interfaces";

const PodcastRating = ({ open, handleClose }: PodcastRatingProps) => {
  const { userId, podcastDetail, classes, rating, setRating, handleRate } =
    usePrepare();

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box className={classes.modalContent}>
        <Box className={classes.modalHeading}>
          <Typography id="modal-title" className={classes.modalTitle}>
            Rate podcast
          </Typography>
          <Box component="button" onClick={handleClose}>
            <CloseIcon />
          </Box>
        </Box>

        <Box className={classes.ratingContainer}>
          <img
            alt={`${podcastDetail?.title} cover photo`}
            className={classes.seriesImage}
            src={podcastDetail?.coverUrl}
          />
          <Typography className={classes.seriesTitle}>
            {podcastDetail?.title}
          </Typography>
          {userId ? (
            <>
              <Rating
                className={classes.rating}
                size="large"
                value={rating}
                onChange={(_, newValue) => {
                  setRating(newValue ?? 0);
                }}
              />
              <Button className={classes.submitBtn} onClick={handleRate}>
                Submit
              </Button>
            </>
          ) : (
            <Typography className={classes.remindLogin}>
              Please log in to rate!
            </Typography>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default PodcastRating;
