import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { useStyles } from "./styles";
import { usePrepare } from "./helpers";

import type { CardProps } from "./interfaces";

const Card = ({ link, image, imageAlt, title, author }: CardProps) => {
  const { t } = usePrepare();
  const { classes } = useStyles();

  return (
    <Link className={classes.series} to={link}>
      <Box>
        <img src={image} alt={imageAlt} className={classes.seriesImg} />
      </Box>
      <Box className={classes.seriesInfo}>
        <Typography className={classes.seriesTitle}>{title}</Typography>
        <Typography className={classes.seriesAuthor}>
          {t("by")} {author}
        </Typography>
      </Box>
    </Link>
  );
};

export default Card;
