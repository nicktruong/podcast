import Box from "@mui/material/Box";
import { Trans } from "react-i18next";
import { Button, Typography } from "@mui/material";

import { ColorIconStepper } from "@/components";

import useHelper from "./useHelper";
import { PodcasterDashboardOnboardingProps } from "./interfaces";

export default function PodcasterDashboardOnboarding({
  handleClickOpenEpisodeDialog,
  handleOpenCreateSeriesDialog,
}: PodcasterDashboardOnboardingProps) {
  const { classes, hasPodSeries, createdFirstEp, t, cx } = useHelper();

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
            <ColorIconStepper
              steps={[
                "Make your first episode",
                "Set up your podcast",
                "Get listeners!",
              ]}
              activeStep={1}
            />
          </Box>

          <Box className="pl-4">
            <Box className={classes.stepContent}>
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

                  <Button
                    variant="roundedContained"
                    className={classes.letDoItBtn}
                    onClick={handleClickOpenEpisodeDialog}
                  >
                    {t("letDoIt")}
                  </Button>
                </>
              )}
            </Box>

            <Box className={cx(classes.stepContent, "mt-[50px]")}>
              {hasPodSeries ? (
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
                    onClick={handleOpenCreateSeriesDialog}
                  >
                    {t("goToSetup")}
                  </Button>
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
