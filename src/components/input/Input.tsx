import { TextField, TextFieldProps } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ helperText, sx, ...props }, ref) => {
    return (
      <TextField
        ref={ref}
        helperText={
          helperText && (
            <>
              <ErrorIcon sx={{ width: "20px", height: "20px" }} />
              {helperText}
            </>
          )
        }
        sx={{
          width: "100%",
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          ...sx,
        }}
        InputLabelProps={{
          sx: {
            "&.MuiFormLabel-root": {
              transform: "translate(14px, 8px) scale(1)",
            },
            "&.Mui-focused": {
              transform: "translate(14px, -8px) scale(0.75)",
            },
          },
        }}
        inputProps={{
          sx: {
            padding: "8px 14px",
          },
        }}
        FormHelperTextProps={{
          sx: {
            marginX: 0,
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            display: "flex",
            columnGap: "2px",
            fontWeight: 600,
          },
        }}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
