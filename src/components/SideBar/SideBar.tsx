import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

import routes from "@/common/constants/routes";

import useHelper from "./useHelper";

export default function SideBar() {
  const { active, cx, classes, sidebarExpand } = useHelper();

  return (
    <Box>
      <Box className={classes.section}>
        <Link to={routes.index}>
          <ListItemButton className={classes.button}>
            <ListItemIcon>
              <HomeIcon className={cx(classes.icon, active[routes.index])} />
            </ListItemIcon>
            {sidebarExpand && (
              <ListItemText
                className={cx(classes.text, active[routes.index])}
                primary="Home"
              />
            )}
          </ListItemButton>
        </Link>

        <Link to={routes.search}>
          <ListItemButton className={classes.button}>
            <ListItemIcon>
              <SearchIcon className={cx(classes.icon, active[routes.search])} />
            </ListItemIcon>
            {sidebarExpand && (
              <ListItemText
                className={cx(classes.text, active[routes.search])}
                primary="Search"
              />
            )}
          </ListItemButton>
        </Link>
      </Box>
    </Box>
  );
}
