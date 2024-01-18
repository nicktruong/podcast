import { useLocation } from "react-router-dom";

import routes from "@/common/constants/routes";
import { useAppSelector } from "@/hooks/storeHooks";
import { selectUIState } from "@/store/ui/uiSlice";

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
