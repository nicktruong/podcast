import ErrorIcon from "@mui/icons-material/Error";
import CheckIcon from "@mui/icons-material/Check";
import {
  Box,
  CircularProgress,
  Typography,
  FormHelperText,
} from "@mui/material";
import { tss } from "tss-react/mui";
import { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";

import { Category } from "@/common/interfaces/Category";
import { isDark } from "@/common/utils/color";
import NextButton from "@/components/button/NextButton";
import { OAuthRegisterCategories } from "@/common/interfaces/OAuthRegisterCategories";

interface Props {
  setValue: UseFormSetValue<OAuthRegisterCategories>;
  categories: Category;
  watch: UseFormWatch<OAuthRegisterCategories>;
  isSubmitting: boolean;
  errors: FieldErrors<OAuthRegisterCategories>;
}

const useStyles = tss.withNestedSelectors().create(({ classes }) => ({
  categoriesContainer: {
    gap: "12px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
    height: "360px",
    overflowY: "auto",
  },
  category: {
    cursor: "pointer",
    borderRadius: "4px",
    position: "relative",

    "&:hover": {
      [`.${classes.categoryBackground}`]: {
        boxShadow: "rgba(255, 255, 255, 0.25) 0px 10px 30px",
      },
    },
  },
  chosenCategory: {
    [`& :not(.${classes.checkIcon}):not(.${classes.checkIcon} > path)`]: {
      opacity: "0.7",
    },
  },
  categoryBackground: {
    width: "100%",
    aspectRatio: "1 / 1",
    borderRadius: "16px",
    transition: "all 0.2s ease-in",
    boxShadow: "rgba(255, 255, 255, 0.15) 0px 5px 15px",
  },
  categoryName: {
    fontWeight: 600,
    textAlign: "center",
    position: "absolute",
    fontSize: "14px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    wordWrap: "break-word",
    width: "100%",
  },
  checkIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    fontSize: "56px",
    display: "none",
  },
  block: {
    display: "block",
  },
}));

export default function CategoriesForm({
  setValue,
  categories,
  watch,
  isSubmitting,
  errors,
}: Props) {
  const { cx, classes } = useStyles();
  const categoriesOfInterest = watch("categoriesOfInterest");

  return (
    <>
      <Box className="max-w-[26rem] mx-auto sm:-translate-x-6 pb-10">
        <Box className="sm:pl-16 sm:pr-4 mt-4">
          <Typography
            fontWeight={700}
            fontSize="24px"
            marginTop="40px"
            marginBottom="16px"
          >
            Choose your categories of interest
          </Typography>

          <Box className={classes.categoriesContainer}>
            {categories.categories.map((category) => {
              const isChosen = categoriesOfInterest.includes(category.name);

              return (
                <Box
                  className={cx(classes.category, {
                    [classes.chosenCategory]: isChosen,
                  })}
                  key={category.name}
                  onClick={() => {
                    if (!isChosen) {
                      setValue("categoriesOfInterest", [
                        ...categoriesOfInterest,
                        category.name,
                      ]);
                    } else {
                      setValue(
                        "categoriesOfInterest",
                        categoriesOfInterest.filter(
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

          <NextButton
            type="submit"
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
            Finish
          </NextButton>
        </Box>
      </Box>
    </>
  );
}
