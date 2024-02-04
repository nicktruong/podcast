import { useAppSelector } from "@/hooks";
import { selectUIState } from "@/store/ui";

import { useStyles } from "./styles";

export const usePrepareHook = () => {
  const { classes } = useStyles();

  const { isSidebarExpand } = useAppSelector(selectUIState);

  return { classes, isSidebarExpand };
};
