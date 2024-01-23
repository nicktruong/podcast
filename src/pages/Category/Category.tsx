import { Box, MenuItem, Select, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { routes } from "@/common/constants";

import { usePrepare } from "./usePrepare";

const Category = () => {
  const { classes, sortBy, categoriesSeries, handleSelectSortBy } =
    usePrepare();

  console.log(categoriesSeries);

  return (
    <Box className={classes.categoryRoot}>
      <Box className={classes.categoryContent}>
        <Box className={classes.sortByContainer}>
          <Typography>Sort by: </Typography>
          <Select
            value={sortBy}
            // className={classes.playbackRateSelect}
            onChange={(event) =>
              handleSelectSortBy(
                event.target.value as "playCount" | "createdAt"
              )
            }
          >
            <MenuItem value="createdAt">
              <span>Recent</span>
            </MenuItem>
            <MenuItem value="playCount">
              <span>Play count</span>
            </MenuItem>
          </Select>
        </Box>

        <Box className={classes.resultContainer}>
          {categoriesSeries.map((series) => (
            <Link
              key={series.id}
              className={classes.result}
              to={routes.playlist.replace(":id", series.id)}
            >
              <Box>
                <img
                  className={classes.resultImg}
                  src={series.coverUrl}
                  alt={`${series.title} avatar`}
                />
              </Box>
              <Box className={classes.resultInfo}>
                <Typography className={classes.resultTitle}>
                  {series.title}
                </Typography>
                <Typography className={classes.resultAdditionalInfo}>
                  {series.author?.name}
                </Typography>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Category;
