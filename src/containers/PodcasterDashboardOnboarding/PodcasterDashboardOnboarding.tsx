import Box from "@mui/material/Box";
import { Trans } from "react-i18next";
import { Button, Typography } from "@mui/material";

import { ColorIconStepper } from "@/components";

import useHelper from "./useHelper";
import { PodcasterDashboardOnboardingProps } from "./interfaces";

export default function PodcasterDashboardOnboarding({
  onOpenDialog,
}: PodcasterDashboardOnboardingProps) {
  const { classes, hasPodcast, createdFirstEp, t, cx } = useHelper();

  return (
    <Box className={classes.onboardingRoot}>
      <Box className={classes.welcomeBox}>
        <Typography className={classes.welcomeHeader}>
          <Trans i18nKey="welcomeText" t={t}>
            Welcome to <span className="whitespace-nowrap">GO Podcast</span> for
            Podcasters!
          </Trans>
        </Typography>

        <Typography className="mt-4">{t("hereIsWhatHappenNext")}</Typography>
      </Box>

      <Box className={classes.onboardingContainer}>
        <Box className={classes.onboardingSteps}>
          <Box className="px-4">
            <ColorIconStepper stepsCount={3} activeStep={hasPodcast ? 1 : 0} />
          </Box>

          <Box className="pl-4">
            <Box className={classes.stepContent}>
              {hasPodcast ? (
                <Typography>{t("yourPodcastIsSettedUp")}</Typography>
              ) : (
                <>
                  <Typography fontWeight={700}>
                    {t("setupYourPodcast")}
                  </Typography>

                  <Typography fontSize={14} className="mt-1">
                    {t("setupTips")}
                  </Typography>

                  <Button
                    variant="roundedContained"
                    className={classes.setupBtn}
                    onClick={onOpenDialog}
                  >
                    {t("goToSetup")}
                  </Button>
                </>
              )}
            </Box>

            <Box className={cx(classes.stepContent, "mt-[50px]")}>
              {createdFirstEp ? (
                <Typography>{t("firstEpisodePublished")}</Typography>
              ) : (
                <>
                  <Typography fontWeight={700}>
                    {t("makeYourFirstEpisode")}
                  </Typography>

                  <Typography fontSize={14} className="mt-1">
                    {t("makeYourFirstEpisodeTip")}
                  </Typography>

                  {hasPodcast ? (
                    <Button
                      onClick={onOpenDialog}
                      variant="roundedContained"
                      className={classes.letDoItBtn}
                    >
                      {t("letDoIt")}
                    </Button>
                  ) : (
                    <Box className="mt-2 h-[38.75px]" />
                  )}
                </>
              )}
            </Box>

            <Box className={cx(classes.stepContent, "mt-[50px]")}>
              <Typography fontWeight={700}>{t("getListeners")}</Typography>
              <Typography fontSize={14}>{t("getListenersTips")}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
