import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

import { ColorIconStepper } from "@/components/stepper/color-icon";
import RoundedButton from "@/components/rounded-button/RoundedButton";

export default function PodOnboarding() {
  return (
    <Box
      sx={(theme) => ({
        padding: "40px 16px",
        [theme.breakpoints.up("md")]: {
          padding: "64px 40px",
        },
      })}
    >
      <Box
        sx={(theme) => ({
          [theme.breakpoints.up("sm")]: {
            textAlign: "center",
          },
        })}
      >
        <Typography
          sx={{ fontSize: "32px", lineHeight: "32px", fontWeight: 700 }}
        >
          Welcome to <span className="whitespace-nowrap">GO Podcast</span> for
          Podcasters!
        </Typography>

        <Typography sx={{ marginTop: "16px" }}>
          Here&apos;s what happen next.
        </Typography>
      </Box>

      <Box
        sx={{
          padding: "64px 16px",
          border: "1px solid #b7b7b7",
          borderRadius: "4px",
          margin: "32px auto",
          maxWidth: "780px",
        }}
      >
        <Box sx={{ maxWidth: "550px", margin: "0 auto", display: "flex" }}>
          <Box sx={{ padding: "0px 16px" }}>
            <ColorIconStepper
              steps={[
                "Make your first episode",
                "Set up your podcast",
                "Get listeners!",
              ]}
              activeStep={1}
            />
          </Box>

          <Box sx={{ paddingLeft: "16px" }}>
            <Box sx={{ maxWidth: "350px" }}>
              <Typography sx={{ fontWeight: 700 }}>
                Make your first episode
              </Typography>

              <Typography sx={{ fontSize: "14px", marginTop: "4px" }}>
                Tip: if you&apos;re not totally ready to commit, try making a
                short trailer to get your podcast out there.
              </Typography>

              <RoundedButton
                variant="contained"
                sx={{
                  marginTop: "8px",
                  padding: "8px 32px",
                  backgroundColor: "#9691ff",
                  color: "#000000",
                  "&:hover": {
                    backgroundColor: "#9e99ff",
                  },
                }}
              >
                Let&apos;s do it
              </RoundedButton>
            </Box>

            <Box sx={{ marginTop: "50px", maxWidth: "350px" }}>
              <Typography sx={{ fontWeight: 700 }}>
                Set up your podcast
              </Typography>

              <Typography sx={{ fontSize: "14px", marginTop: "4px" }}>
                Choose a name and cover art for your podcast. Don&apos;t have it
                all figured out yet? You can always change this later.
              </Typography>

              <RoundedButton
                variant="outlined"
                sx={{
                  padding: "8px 32px",
                  marginTop: "8px",
                }}
              >
                Go to setup
              </RoundedButton>
            </Box>

            <Box sx={{ marginTop: "50px", maxWidth: "350px" }}>
              <Typography sx={{ fontWeight: 700 }}>Get listeners!</Typography>
              <Typography sx={{ fontSize: "14px" }}>
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
