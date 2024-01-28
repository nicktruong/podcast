import {
  Box,
  Typography,
  FormHelperText,
  CircularProgress,
  Button,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";

import { isDark } from "@/common/utils";

import { usePrepare } from "./usePrepare";
import { CategoriesFormProps } from "./interfaces";

export default function CategoriesForm({
  errors,
  categories,
  isSubmitting,
  chosenCategories,
  setValue,
}: CategoriesFormProps) {
  const { cx, classes } = usePrepare();

  const { t } = useTranslation("SignUp");

  return (
    <>
      <Box className="sm:pl-16 sm:pr-4 mt-4">
        <Box className={classes.categoriesContainer}>
          {categories.map((category) => {
            const isChosen = chosenCategories.includes(category.name);

            return (
              <Box
                className={cx(classes.category, {
                  [classes.chosenCategory]: isChosen,
                })}
                key={category.name}
                onClick={() => {
                  if (!isChosen) {
                    setValue("categoriesOfInterest", [
                      ...chosenCategories,
                      category.name,
                    ]);
                  } else {
                    setValue(
                      "categoriesOfInterest",
                      chosenCategories.filter(
                        (chosenCategory) => chosenCategory !== category.name
                      )
                    );
                  }
                }}
              >
                <CheckIcon
                  className={cx(classes.checkIcon, {
                    [classes.block]: isChosen,
                  })}
                />
                <Box
                  className={classes.categoryBackground}
                  sx={{ backgroundColor: category.color }}
                />
                <Box>
                  <Typography
                    className={cx(
                      classes.categoryName,
                      isDark(category.color) ? "text-white" : "text-black"
                    )}
                  >
                    {category.name}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        <FormHelperText
          error={!!errors.categoriesOfInterest}
          sx={{
            marginX: 0,
            display: "flex",
            columnGap: "2px",
          }}
        >
          {errors.categoriesOfInterest && (
            <>
              <ErrorIcon sx={{ width: "20px", height: "20px" }} />
              <Typography
                component="span"
                sx={{
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  fontWeight: 600,
                }}
              >
                {errors.categoriesOfInterest?.message}
              </Typography>
            </>
          )}
        </FormHelperText>

        <Button
          type="submit"
          variant="next"
          sx={{ marginTop: "20px" }}
          endIcon={
            isSubmitting && (
              <CircularProgress
                size="20px"
                sx={(theme) => ({
                  color: theme.palette.primary.contrastText,
                })}
              />
            )
          }
        >
          {t("finish")}
        </Button>
      </Box>
    </>
  );
}
