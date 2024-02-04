export interface StyledDrawerProps {
  openDrawer: boolean;
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  handleClickOpenEpisodeDialog: () => void;
}
