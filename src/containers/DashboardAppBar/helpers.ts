import { useState } from "react";

export const usePrepareHook = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        (event as React.KeyboardEvent).key !== "Escape"
      ) {
        return;
      }

      setOpenDrawer(open);
    };

  return { openDrawer, toggleDrawer };
};
