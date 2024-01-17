import { Box } from "@mui/material";

import Logo from "@/components/logo/Logo";

import { Steps } from "./interface";
import useHelper from "./useHelper";
import EmailForm from "./containers/EmailForm";
import PasswordForm from "./containers/PasswordForm";
import UserInfoForm from "./containers/UserInfoForm";
import CategoriesForm from "./containers/CategoriesForm";

export default function SignUp() {
  const {
    watch,
    errors,
    control,
    setValue,
    onSubmit,
    categories,
    activeStep,
    isSubmitting,
    validateDate,
    handlePrevStep,
    nextStepHandler,
  } = useHelper();

  const renderStep = (step: Steps) => {
    switch (step) {
      case Steps.Email:
        return (
          <EmailForm
            control={control}
            errors={errors}
            nextStepHandler={nextStepHandler}
          />
        );

      case Steps.Password:
        return (
          <PasswordForm
            activeStep={activeStep}
            control={control}
            errors={errors}
            handlePrevStep={handlePrevStep}
            nextStepHandler={nextStepHandler}
          />
        );

      case Steps.UserInfo:
        return (
          <UserInfoForm
            activeStep={activeStep}
            control={control}
            errors={errors}
            handlePrevStep={handlePrevStep}
            validateDate={validateDate}
            nextStepHandler={nextStepHandler}
          />
        );

      case Steps.Categories:
        return (
          <CategoriesForm
            activeStep={activeStep}
            handlePrevStep={handlePrevStep}
            setValue={setValue}
            categories={categories}
            watch={watch}
            isSubmitting={isSubmitting}
            errors={errors}
          />
        );

      default:
        return <>No step found</>;
    }
  };

  return (
    <Box>
      <Box className="p-8 flex items-center gap-x-[2px] spacing text-xl max-w-screen-xl mx-auto">
        <Logo />
      </Box>

      <Box className="px-8">
        <form onSubmit={onSubmit}>{renderStep(activeStep)}</form>
      </Box>
    </Box>
  );
}
