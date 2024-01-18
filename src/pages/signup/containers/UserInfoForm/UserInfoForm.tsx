import {
  Box,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import ErrorIcon from "@mui/icons-material/Error";

import StyledInput from "@/components/input/Input";
import { genders, months } from "@/common/constants";
import StyledButton from "@/components/button/Button";
import HorizontalLinearStepper from "@/components/stepper/HorizontalLineStepper";

import { steps } from "../../constants";
import StepInfo from "../../components/StepInfo/StepInfo";

import { UserInfoFormProps } from "./interfaces";

const UserInfoForm = ({
  errors,
  control,
  activeStep,
  validateDate,
  handlePrevStep,
}: UserInfoFormProps) => {
  return (
    <>
      <Box className="max-w-[26rem] mx-auto sm:-translate-x-6">
        <HorizontalLinearStepper activeStep={activeStep} steps={steps} />
      </Box>

      <Box className="max-w-[26rem] mx-auto sm:-translate-x-6 pb-10">
        <StepInfo
          activeStep={activeStep}
          handlePrevStep={handlePrevStep}
          steps={steps}
        />

        <Box className="sm:pl-16 sm:pr-4 mt-4">
          <Typography fontSize="14px" fontWeight={700} marginBottom="2px">
            Name
          </Typography>

          <Typography
            fontSize="14px"
            lineHeight="18px"
            color="#a6a6a6"
            fontWeight={500}
          >
            This name will appear on your profile
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
                  helperText={errors.name && <span>{errors.name.message}</span>}
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
            Date of birth
          </Typography>

          <Typography
            fontSize="14px"
            lineHeight="18px"
            color="#a6a6a6"
            fontWeight={500}
          >
            Why do we need your date of birth? Learn more.
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
                      placeholder="dd"
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
                      sx={{
                        marginTop: "8px",
                        flexGrow: 1,
                        color: field.value === "" ? "#898989" : "inherit",
                        "& .MuiSelect-select": {
                          padding: "8px 14px",
                        },
                      }}
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
                        Month
                      </MenuItem>
                      {months.map((month) => (
                        <MenuItem key={month.value} value={month.value}>
                          {month.label}
                        </MenuItem>
                      ))}
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
                      sx={{ marginTop: "8px", width: "3.8rem" }}
                      placeholder="yyyy"
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
                      {message}
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
            Gender
          </Typography>

          <Typography
            fontSize="14px"
            lineHeight="18px"
            color="#a6a6a6"
            fontWeight={500}
          >
            We use your gender to help personalize our content recommendations
            and ads for you.
          </Typography>

          <Controller
            name="gender"
            control={control}
            render={({ field }) => {
              return (
                <RadioGroup sx={{ flexDirection: "row" }} {...field}>
                  {genders.map((gender) => (
                    <FormControlLabel
                      sx={{
                        "& .MuiTypography-root": { fontSize: "14px" },
                        "& .MuiSvgIcon-root": { fontSize: "20px" },
                      }}
                      key={gender.value}
                      control={<Radio />}
                      label={gender.label}
                      value={gender.value}
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
                {errors.gender?.message}
              </Typography>
            </FormHelperText>
          )}

          <StyledButton type="submit">Finish</StyledButton>
        </Box>
      </Box>
    </>
  );
};

export default UserInfoForm;
