import { Box, Typography, FormHelperText } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";

import { isDark } from "@/utils";
import { LoadingButton } from "@/components";

import { usePrepareHook } from "./helpers";
import { CategoriesFormProps } from "./interfaces";

export default function CategoriesForm({
  errors,
  categories,
  isSubmitting,
  chosenCategories,
  setValue,
}: CategoriesFormProps) {
  const { classes, handleCategoryClick, t, cx } = usePrepareHook({
    chosenCategories,
    setValue,
  });

  return (
    <>
      <Box className="sm:pl-16 sm:pr-4 mt-4">
        <Box className={classes.categoriesContainer}>
          {categories.map((category) => {
            const isChosen = chosenCategories.includes(category.name);

            return (
              <Box
                key={category.name}
                className={cx(classes.category, {
                  [classes.chosenCategory]: isChosen,
                })}
                onClick={() => handleCategoryClick(isChosen, category.name)}
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
          className={classes.formHelperText}
          error={!!errors.categoriesOfInterest}
        >
          {errors.categoriesOfInterest && (
            <>
              <ErrorIcon sx={{ width: "20px", height: "20px" }} />
              <Typography component="span" className={classes.errorMessage}>
                {errors.categoriesOfInterest?.message}
              </Typography>
            </>
          )}
        </FormHelperText>

        <LoadingButton
          type="submit"
          variant="next"
          loading={isSubmitting}
          sx={{ marginTop: "20px" }}
        >
          {t("finish")}
        </LoadingButton>
      </Box>
    </>
  );
}
