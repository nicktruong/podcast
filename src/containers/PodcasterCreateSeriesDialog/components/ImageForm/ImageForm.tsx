import { Box, Typography } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

interface Props {
  title: string;
  image?: string;
  classes: Record<string, string>;
}

export default function ImageForm({ classes, title, image }: Props) {
  return (
    <>
      <Box className={classes.headingRoot}>
        <Typography component="h1" className={classes.dialogHeading}>
          {title}
        </Typography>

        <Box className={classes.coverArtRoot}>
          {!image && <ImageIcon className={classes.coverArtPlaceHolder} />}
          {image && (
            <img
              className="w-full h-full rounded"
              src={image}
              alt="Podcast cover"
            />
          )}
        </Box>
      </Box>
    </>
  );
}
