import { StepIconProps } from "@mui/material/StepIcon";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ImageIcon from "@mui/icons-material/Image";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import CheckIcon from "@mui/icons-material/Check";

import ColorStepIconRoot from "./ColorStepIconRoot";

function ColorStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <LibraryBooksIcon />,
    2: <ImageIcon />,
    3: <AutoGraphIcon />,
  };

  return (
    <ColorStepIconRoot
      ownerState={{ completed, active, icon: Number(props.icon) }}
      className={className}
      sx={{ transform: `scale(${Number(props.icon) === 1 ? 1.25 : 1})` }}
    >
      {completed ? <CheckIcon /> : icons[String(props.icon)]}
    </ColorStepIconRoot>
  );
}

export default ColorStepIcon;
