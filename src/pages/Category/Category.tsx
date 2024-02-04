import { Box, MenuItem, Select, Typography } from "@mui/material";

import CardsSkeleton from "../Home/components/CardsSkeleton";
import CardGroup from "../Home/components/CardGroup";

import { usePrepareHook } from "./helpers";

const Category = () => {
  const { sortBy, classes, loading, categoriesSeries, handleSelectSortBy } =
    usePrepareHook();

  return (
    <Box className={classes.categoryRoot}>
      <Box className={classes.categoryContent}>
        <Box className={classes.sortByContainer}>
          <Typography>Sort by: </Typography>
          <Select
            value={sortBy}
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

        {!loading ? (
          <Box className={classes.resultContainer}>
            <CardGroup podcasts={categoriesSeries} />
          </Box>
        ) : (
          <Box className={classes.resultContainer}>
            <CardsSkeleton />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Category;
