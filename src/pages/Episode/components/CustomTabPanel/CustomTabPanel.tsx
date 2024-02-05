import { Box } from "@mui/material";

import { usePrepareHook } from "./helpers";

import type { TabPanelProps } from "./interfaces";

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  const { classes } = usePrepareHook();

  return (
    <div
      className={classes.tabContent}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

export default CustomTabPanel;
