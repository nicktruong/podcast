import { useLocation } from "react-router-dom";

import { selectUIState } from "@/store/ui";
import { routes } from "@/common/constants";
import { useAppSelector } from "@/hooks/redux";

import { useStyles } from "./styles";

const useHelper = () => {
  const { sidebarExpand } = useAppSelector(selectUIState);

  const { cx, classes } = useStyles();

  const { pathname } = useLocation();

  const active = {
    [routes.index]: pathname === routes.index ? classes.active : "",
    [routes.search]: pathname === routes.search ? classes.active : "",
  };

  return { active, cx, classes, sidebarExpand };
};

export default useHelper;
