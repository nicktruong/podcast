import { formatDistance } from "date-fns";
import { Box, Button, Typography, alpha } from "@mui/material";

import { routes } from "@/constants";
import { capFirstChar, isDark } from "@/utils";

import { usePrepareHook } from "./helpers";

import type { CardProps } from "./interfaces";

const Card = ({
  link,
  image,
  title,
  author,
  imageAlt,
  createdAt,
  categoryData,
}: CardProps) => {
  const { classes, navigate } = usePrepareHook();

  return (
    <Box
      className={classes.podcast}
      onClick={() => {
        navigate(link);
      }}
    >
      <Box>
        <img src={image} alt={imageAlt} className={classes.seriesImg} />
      </Box>
      <Box className={classes.seriesInfo}>
        {categoryData && (
          <Button
            className={classes.categoryBtn}
            onClick={(event) => {
              event.stopPropagation();
              navigate(routes.category.replace(":name", categoryData.name));
            }}
            sx={(theme) => ({
              color: isDark(categoryData.color)
                ? theme.palette.common.white
                : theme.palette.common.black,
              borderColor: alpha(categoryData.color, 0),
              backgroundColor: alpha(categoryData.color, 0.6),

              "&:hover": {
                borderColor: alpha(categoryData.color, 0),
                backgroundColor: alpha(categoryData.color, 0.8),
              },
            })}
          >
            {categoryData?.name}
          </Button>
        )}

        <Typography className={classes.seriesTitle}>
          {title} - {author}
        </Typography>
        <Typography className={classes.createdAt}>
          {capFirstChar(
            formatDistance(new Date(createdAt), new Date(), { addSuffix: true })
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default Card;
