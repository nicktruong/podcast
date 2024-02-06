import {
  Box,
  Radio,
  Button,
  Select,
  MenuItem,
  RadioGroup,
  Typography,
  FormHelperText,
  FormControlLabel,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ErrorIcon from "@mui/icons-material/Error";

import { Genders } from "@/enums";
import { StyledInput } from "@/components";
import { MONTHS } from "@/constants";

import { UserInfoFormProps } from "./interfaces";

export default function UserInfoForm({
  errors,
  control,
  validateDate,
  nextStepHandler,
}: UserInfoFormProps) {
  const { t } = useTranslation("pages/SignUp");

  return (
    <>
      <Box className="sm:pl-16 sm:pr-4 mt-4">
        <Typography fontSize="14px" fontWeight={700} marginBottom="2px">
          {t("name")}
        </Typography>

        <Typography
          fontSize="14px"
          lineHeight="18px"
          sx={(theme) => ({
            color: theme.palette.custom?.grey.darker,
          })}
          fontWeight={500}
        >
          {t("thisNameWillAppearOnYourProfile")}
        </Typography>

        <Controller
          name="name"
          control={control}
          render={({ field }) => {
            return (
              <StyledInput
                id="name"
                variant="outlined"
                error={!!errors.name}
                sx={{ marginTop: "8px" }}
                helperText={
                  errors.name && <span>{t(errors.name.message ?? "")}</span>
                }
                {...field}
              />
            );
          }}
        />

        <Typography
          fontSize="14px"
          fontWeight={700}
          marginBottom="2px"
          marginTop="24px"
        >
          {t("dateOfBirth")}
        </Typography>

        <Typography
          fontSize="14px"
          lineHeight="18px"
          sx={(theme) => ({
            color: theme.palette.custom?.grey.darker,
          })}
          fontWeight={500}
        >
          {t("whyDoWeNeedYourDateOfBirth")}
        </Typography>

        <Box>
          <Box sx={{ display: "flex", columnGap: "8px" }}>
            <Controller
              name="date"
              control={control}
              render={({ field: { onChange, ...field } }) => {
                return (
                  <StyledInput
                    id="date"
                    variant="outlined"
                    error={!!errors.date}
                    sx={{
                      marginTop: "8px",
                      width: "3rem",
                      flexShrink: 0,
                    }}
                    placeholder={t("dd")}
                    onChange={async (event) => {
                      if (
                        event.currentTarget.value.length >= 3 ||
                        isNaN(+event.currentTarget.value)
                      ) {
                        return;
                      }

                      onChange(event);
                      await validateDate();
                    }}
                    {...field}
                  />
                );
              }}
            />

            <Controller
              name="month"
              control={control}
              render={({ field: { onChange, ...field } }) => {
                return (
                  <Select
                    sx={(theme) => ({
                      marginTop: "8px",
                      flexGrow: 1,
                      color:
                        field.value === ""
                          ? theme.palette.custom?.grey.darker
                          : "inherit",
                      "& .MuiSelect-select": {
                        padding: "8px 14px",
                      },
                    })}
                    id="month"
                    variant="outlined"
                    error={!!errors.month}
                    onChange={async (event) => {
                      onChange(event);
                      await validateDate();
                    }}
                    {...field}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      {t("month")}
                    </MenuItem>
                    {MONTHS.map(({ label, value }) => {
                      // TODO: Capitalize the key
                      return (
                        <MenuItem key={value} value={value}>
                          {label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                );
              }}
            />

            <Controller
              name="year"
              control={control}
              render={({ field: { onChange, ...field } }) => {
                return (
                  <StyledInput
                    id="year"
                    variant="outlined"
                    error={!!errors.year}
                    sx={{
                      marginTop: "8px",
                      width: "4.2rem",
                      textAlign: "center",
                    }}
                    placeholder={t("yyyy")}
                    onChange={async (event) => {
                      if (
                        event.currentTarget.value.length >= 5 ||
                        isNaN(+event.currentTarget.value)
                      ) {
                        return;
                      }

                      onChange(event);
                      await validateDate();
                    }}
                    {...field}
                  />
                );
              }}
            />
          </Box>

          <Box>
            {Object.entries(errors)
              .filter(([field]) => ["date", "month", "year"].includes(field))
              .map(([field, { message }]) => (
                <FormHelperText
                  key={field}
                  error={!!(errors.date || errors.month || errors.year)}
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
                    {t(message ?? "")}
                  </Typography>
                </FormHelperText>
              ))}
          </Box>
        </Box>

        <Typography
          fontSize="14px"
          fontWeight={700}
          marginBottom="2px"
          marginTop="24px"
        >
          {t("gender")}
        </Typography>

        <Typography
          fontSize="14px"
          lineHeight="18px"
          sx={(theme) => ({
            color: theme.palette.custom?.grey.darker,
          })}
          fontWeight={500}
        >
          {t("whyWeUseYourGender")}
        </Typography>

        <Controller
          name="gender"
          control={control}
          render={({ field }) => {
            return (
              <RadioGroup sx={{ flexDirection: "row" }} {...field}>
                {Object.values(Genders)
                  .filter((gender) => gender !== Genders.UNKNOWN)
                  .map((gender) => (
                    <FormControlLabel
                      sx={{
                        "& .MuiTypography-root": { fontSize: "14px" },
                        "& .MuiSvgIcon-root": { fontSize: "20px" },
                      }}
                      key={gender}
                      label={gender}
                      value={gender}
                      control={<Radio />}
                    />
                  ))}
              </RadioGroup>
            );
          }}
        />

        {errors.gender && (
          <FormHelperText
            error={!!errors.gender}
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
              {t(errors.gender?.message ?? "")}
            </Typography>
          </FormHelperText>
        )}

        <Button
          variant="next"
          onClick={nextStepHandler}
          sx={{ marginTop: "20px" }}
        >
          <span>{t("next")}</span>
        </Button>
      </Box>
    </>
  );
}
