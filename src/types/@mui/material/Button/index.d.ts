import "@mui/material/Button";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    auth: true;
    next: true;
    round: true;
    roundedOutlined: true;
    roundedContained: true;
  }
}
