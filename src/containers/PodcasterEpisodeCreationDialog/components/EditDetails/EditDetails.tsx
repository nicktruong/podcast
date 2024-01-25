import { Controller } from "react-hook-form";
import ErrorIcon from "@mui/icons-material/Error";
import { Box, FormHelperText, Typography } from "@mui/material";

import { StyledInput } from "@/components";

import { EditDetailsProps } from "./interfaces";

export default function EditDetails({
  onSubmit,
  control,
  errors,
}: EditDetailsProps) {
  return (
    <Box sx={{ maxWidth: "524px", margin: "0 auto" }}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "24px",
        }}
      >
        Episode Details
      </Typography>
      <Typography
        sx={(theme) => ({
          fontWeight: 500,
          marginTop: "12px",
          color: theme.palette.text.secondary,
        })}
      >
        Add information and decide when to publish.
      </Typography>

      <form onSubmit={onSubmit}>
        <Box sx={{ marginTop: "40px" }}>
          <Typography fontSize="14px" fontWeight={700} marginBottom="8px">
            Title
          </Typography>
          <Controller
            name="title"
            control={control}
            render={({ field }) => {
              return (
                <StyledInput
                  id="name"
                  variant="outlined"
                  placeholder="Give your episode a name"
                  error={!!errors.title}
                  helperText={
                    errors.title && <span>{errors.title.message}</span>
                  }
                  {...field}
                />
              );
            }}
          />
          {/* Max 200 characters */}
        </Box>

        <Box sx={{ marginTop: "24px" }}>
          <Typography fontSize="14px" fontWeight={700} marginBottom="8px">
            Description
          </Typography>

          {/* Max 4000 characters */}
          <Controller
            name="description"
            control={control}
            render={({ field }) => {
              return (
                <textarea
                  rows={4}
                  id="description"
                  className="border border-[#c6c6c6] rounded w-full py-[8px] px-[14px]"
                  placeholder="What else do you want your audience to know?"
                  {...field}
                />
              );
            }}
          />

          {errors.description && (
            <FormHelperText
              error={!!errors.description}
              sx={{
                marginX: 0,
                display: "flex",
                columnGap: "2px",
              }}
            >
              <ErrorIcon sx={{ width: "20px", height: "20px" }} />
              <Typography
                component="span"
                sx={{
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  fontWeight: 600,
                }}
              >
                {errors.description?.message}
              </Typography>
            </FormHelperText>
          )}
        </Box>
      </form>
    </Box>
  );
}
