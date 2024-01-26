import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { routes } from "@/common/constants";

import { usePrepare } from "./usePrepare";

const Search = () => {
  const { classes, categories, searchText, searchResult } = usePrepare();

  const { podcasters, podcasts: series } = searchResult;

  return (
    <Box className={classes.searchRoot}>
      <Box className={classes.searchContent}>
        {searchText.length === 0 ? (
          <>
            <Typography className={classes.searchHeading}>
              Browse all
            </Typography>

            <Box className={classes.categories}>
              {categories.map((category) => {
                return (
                  <Link
                    key={category.name}
                    to={routes.category.replace(
                      ":name",
                      encodeURIComponent(category.name)
                    )}
                  >
                    <Box
                      className={classes.category}
                      sx={{ backgroundColor: category.color }}
                    >
                      <Typography
                        key={category.name}
                        className={classes.categoryTitle}
                      >
                        {category.name}
                      </Typography>
                    </Box>
                  </Link>
                );
              })}
            </Box>
          </>
        ) : (
          <>
            {!podcasters.length && !series.length && (
              <Typography>Your search did not match any documents.</Typography>
            )}

            {!!podcasters.length && (
              <Box className={classes.section}>
                <Typography className={classes.searchHeading}>
                  Podcasters
                </Typography>
                <Box className={classes.resultContainer}>
                  {podcasters.map((podcaster) => (
                    <Link
                      key={podcaster.id}
                      className={classes.result}
                      to={"routes.podcasterProfile"}
                    >
                      <Box>
                        <img
                          className={classes.resultImg}
                          src={podcaster.photoURL}
                          alt={`${podcaster.name} avatar`}
                        />
                      </Box>
                      <Box className={classes.resultInfo}>
                        <Typography className={classes.resultTitle}>
                          {podcaster.name}
                        </Typography>
                        <Typography className={classes.resultAdditionalInfo}>
                          Podcaster
                        </Typography>
                      </Box>
                    </Link>
                  ))}
                </Box>
              </Box>
            )}

            {!!series.length && (
              <Box className={classes.section}>
                <Typography className={classes.searchHeading}>
                  Podcast series
                </Typography>
                <Box className={classes.resultContainer}>
                  {series.map((series) => (
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
                          {series.author}
                        </Typography>
                      </Box>
                    </Link>
                  ))}
                </Box>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Search;
