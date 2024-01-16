import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

import { ColorIconStepper } from "@/components/stepper/color-icon";
import RoundedButton from "@/components/rounded-button/RoundedButton";

import useHelper from "./useHelper";

interface Props {
  handleClickOpenEpisodeDialog: () => void;
  handleOpenCreateSeriesDialog: () => void;
}

export default function PodOnboarding({
  handleClickOpenEpisodeDialog,
  handleOpenCreateSeriesDialog,
}: Props) {
  const { cx, classes, hasPodSeries, createdFirstEp } = useHelper();

  return (
    <Box className={classes.onboardingRoot}>
      <Box className={classes.welcomeBox}>
        <Typography className={classes.welcomeHeader}>
          Welcome to <span className="whitespace-nowrap">GO Podcast</span> for
          Podcasters!
        </Typography>

        <Typography className="mt-4">Here&apos;s what happen next.</Typography>
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
                <Typography>First episode published</Typography>
              ) : (
                <>
                  <Typography fontWeight={700}>
                    Make your first episode
                  </Typography>

                  <Typography fontSize={14} className="mt-1">
                    Tip: if you&apos;re not totally ready to commit, try making
                    a short trailer to get your podcast out there.
                  </Typography>

                  <RoundedButton
                    variant="contained"
                    className={classes.letDoItBtn}
                    onClick={handleClickOpenEpisodeDialog}
                  >
                    Let&apos;s do it
                  </RoundedButton>
                </>
              )}
            </Box>

            <Box className={cx(classes.stepContent, "mt-[50px]")}>
              {hasPodSeries ? (
                <Typography>Your podcast is set up</Typography>
              ) : (
                <>
                  <Typography fontWeight={700}>Set up your podcast</Typography>

                  <Typography fontSize={14} className="mt-1">
                    Choose a name and cover art for your podcast. Don&apos;t
                    have it all figured out yet? You can always change this
                    later.
                  </Typography>

                  <RoundedButton
                    variant="outlined"
                    className={classes.setupBtn}
                    onClick={handleOpenCreateSeriesDialog}
                  >
                    Go to setup
                  </RoundedButton>
                </>
              )}
            </Box>

            <Box className={cx(classes.stepContent, "mt-[50px]")}>
              <Typography fontWeight={700}>Get listeners!</Typography>
              <Typography fontSize={14}>
                All that&apos;s left to do is tell people about your podcast. As
                soon as you get a few plays, we&apos;ll show your analytics
                here.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
