import { Button, ButtonProps, CircularProgress } from "@mui/material";

const LoadingButton = ({
  loading,
  children,
  ...props
}: ButtonProps & { loading: boolean }) => {
  return (
    <Button
      endIcon={
        loading && (
          <CircularProgress
            size="20px"
            sx={(theme) => ({
              color: theme.palette.primary.contrastText,
            })}
          />
        )
      }
      {...props}
    >
      {children}
    </Button>
  );
};

export default LoadingButton;
