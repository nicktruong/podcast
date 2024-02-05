import { Grid } from "@mui/material";

import { routes } from "@/common/constants";

import Card from "../Card/Card";

import { usePrepare } from "./helpers";

import type { CardGroupProps } from "./interfaces";

const CardGroup = ({ podcasts }: CardGroupProps) => {
  const { isSidebarExpand, getCategory } = usePrepare();

  return (
    <Grid container spacing={3}>
      {podcasts.map((podcast) => (
        <Grid
          item
          key={podcast.id}
          lg={isSidebarExpand ? 6 : 3}
          md={isSidebarExpand ? 12 : 6}
        >
          <Card
            title={podcast.title}
            image={podcast.coverUrl}
            author={podcast.author.name}
            createdAt={podcast.createdAt}
            imageAlt={`${podcast.title} cover photo`}
            link={routes.playlist.replace(":id", podcast.id)}
            categoryData={getCategory(podcast.category)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGroup;
