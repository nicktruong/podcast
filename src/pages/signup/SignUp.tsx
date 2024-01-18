import { Box } from "@mui/material";

import Logo from "@/components/logo/Logo";

import { Steps } from "./interface";
import useHelper from "./useHelper";
import EmailForm from "./containers/EmailForm";
import PasswordForm from "./containers/PasswordForm";
import UserInfoForm from "./containers/UserInfoForm";

export default function SignUp() {
  const {
    errors,
    control,
    onSubmit,
    activeStep,
    validateDate,
    validateEmail,
    handlePrevStep,
    handleNextStep,
    validatePassword,
    validateUserInformation,
  } = useHelper();

  const nextStepHandler = async () => {
    switch (activeStep) {
      case Steps.Email: {
        const isValidEmail = await validateEmail();

        if (!isValidEmail) {
          return;
        }

        handleNextStep();
        break;
      }

      case Steps.Password: {
        const isValidPassword = await validatePassword();

        if (!isValidPassword) {
          return;
        }

        handleNextStep();
        break;
      }

      case Steps.UserInfo: {
        const isValidUserInfo = await validateUserInformation();

        if (!isValidUserInfo) {
          return;
        }

        handleNextStep();
        break;
      }

      default: {
        break;
      }
    }
  };

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
