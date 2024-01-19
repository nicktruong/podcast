import {
  Box,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { Control, Controller, FieldErrors } from "react-hook-form";

import { StyledInput } from "@/components";

import type { Category, SeriesCreationData } from "@/common/interfaces";

interface Props {
  categories: Category;
  classes: Record<string, string>;
  control: Control<SeriesCreationData>;
  errors: FieldErrors<SeriesCreationData>;
}

export default function EditSeriesDetails({
  errors,
  classes,
  control,
  categories,
}: Props) {
  return (
    <>
      <Box className={classes.headingRoot}>
        <Typography component="h1" className={classes.dialogHeading}>
          Set up your podcast
        </Typography>
        <Typography className={classes.dialogDesc}>
          Before we can distribute your podcast to additional listening
          platforms, you just need to fill in a few things. <br />
          (You can always change these later.)
        </Typography>
      </Box>

      <Box className={classes.formGroup}>
        <Typography fontSize="14px" fontWeight={700} marginBottom="8px">
          Podcast name
        </Typography>
        <Controller
          name="title"
          control={control}
          render={({ field }) => {
            return (
              <StyledInput
                id="title"
                variant="outlined"
                error={!!errors.title}
                helperText={errors.title && <span>{errors.title.message}</span>}
                {...field}
              />
            );
          }}
        />
        <Typography className={classes.inputLimit}>0 / 100</Typography>
      </Box>

      <Box>
        <Typography fontSize="14px" fontWeight={700} marginBottom="8px">
          Podcast description
        </Typography>
        <Controller
          name="description"
          control={control}
          render={({ field }) => {
            return (
              <textarea
                rows={5}
                id="description"
                className="border border-[#c4c4c4] rounded w-full py-[8px] px-[14px]"
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

        <Typography className={classes.inputLimit}>0 / 600</Typography>
      </Box>

      <Box>
        <Typography fontSize="14px" fontWeight={700} marginBottom="8px">
          Podcast category
        </Typography>
        <Controller
          name="category"
          control={control}
          render={({ field }) => {
            return (
              <Select
                displayEmpty
                id="category"
                variant="outlined"
                className={classes.selectRoot}
                {...field}
              >
                <MenuItem value="" disabled>
                  Choose one option
                </MenuItem>
                {categories.categories.map((category) => (
                  <MenuItem key={category.name} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            );
          }}
        />
      </Box>
    </>
  );
}
