import { Box } from "@mui/material";
import { UseFormSetValue } from "react-hook-form";

import { SignUpSteps } from "@/common/enums";
import { CategoriesForm } from "@/containers";
import { Logo, QontoStepper } from "@/components";
import { signUpStepsLabel } from "@/common/constants";
import { RegistrationInterests } from "@/common/interfaces";

import usePrepare from "./usePrepare";
import { StepInfo } from "./components";
import { EmailForm, PasswordForm, UserInfoForm } from "./containers";

export default function SignUp() {
  const {
    errors,
    control,
    categories,
    activeStep,
    isSubmitting,
    watch,
    setValue,
    onSubmit,
    validateDate,
    handlePrevStep,
    nextStepHandler,
  } = usePrepare();

  const renderStep = (step: SignUpSteps) => {
    switch (step) {
      case SignUpSteps.Password:
        return (
          <PasswordForm
            errors={errors}
            control={control}
            nextStepHandler={nextStepHandler}
          />
        );

      case SignUpSteps.UserInfo:
        return (
          <UserInfoForm
            errors={errors}
            control={control}
            validateDate={validateDate}
            nextStepHandler={nextStepHandler}
          />
        );

      case SignUpSteps.Categories:
        return (
          <CategoriesForm
            errors={errors}
            categories={categories}
            isSubmitting={isSubmitting}
            chosenCategories={watch("categoriesOfInterest")}
            setValue={
              setValue as unknown as UseFormSetValue<RegistrationInterests>
            }
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
        <form onSubmit={onSubmit}>
          {activeStep === SignUpSteps.Email ? (
            <EmailForm
              errors={errors}
              control={control}
              nextStepHandler={nextStepHandler}
            />
          ) : (
            <>
              <Box className="max-w-[26rem] mx-auto sm:-translate-x-6">
                <QontoStepper
                  activeStep={activeStep}
                  steps={signUpStepsLabel}
                />
              </Box>
              <Box className="max-w-[26rem] mx-auto sm:-translate-x-6 pb-10">
                <StepInfo
                  activeStep={activeStep}
                  steps={signUpStepsLabel}
                  handlePrevStep={handlePrevStep}
                />

                {renderStep(activeStep)}
              </Box>
            </>
          )}
        </form>
      </Box>
    </Box>
  );
}
