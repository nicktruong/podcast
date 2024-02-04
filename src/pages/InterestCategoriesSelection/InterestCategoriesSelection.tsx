import { Box, Typography } from "@mui/material";

import CategoriesForm from "@/containers/CategoriesForm";

import { usePrepareHook } from "./helpers";

const InterestCategoriesSelection = () => {
  const {
    errors,
    categories,
    isSubmitting,
    categoriesOfInterest,
    onSubmit,
    setValue,
  } = usePrepareHook();

  return (
    <form onSubmit={onSubmit}>
      <Box className="max-w-[26rem] mx-auto sm:-translate-x-6 pb-10 mt-20">
        <Typography className="sm:pl-16 sm:pr-4 mt-4 !mb-8 !font-bold !text-2xl">
          Choose your interest categories
        </Typography>

        <CategoriesForm
          errors={errors}
          setValue={setValue}
          categories={categories}
          isSubmitting={isSubmitting}
          chosenCategories={categoriesOfInterest}
        />
      </Box>
    </form>
  );
};

export default InterestCategoriesSelection;
