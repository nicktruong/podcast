import Check from "@mui/icons-material/Check";
import { StepIconProps } from "@mui/material/StepIcon";

import QontoStepIconRoot from "./QontoStepIconRoot";

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

export default QontoStepIcon;
