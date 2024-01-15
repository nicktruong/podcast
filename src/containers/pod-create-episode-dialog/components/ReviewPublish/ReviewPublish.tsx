import { Box, Typography } from "@mui/material";

import { Pod, UserInfo } from "@/common/interfaces";

interface Props {
  podInfo: Pod;
  user: UserInfo;
}

export default function ReviewPublish({ podInfo, user }: Props) {
  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "24px",
        }}
      >
        Review
      </Typography>

      <Box
        sx={{
          display: "flex",
          columnGap: "16px",
          alignItems: "center",
        }}
      >
        <img
          width="56px"
          height="56px"
          className="rounded"
          alt="Podcast cover art"
          src="https://s3-us-west-2.amazonaws.com/anchor-generated-image-bank/staging/podcast_uploaded_nologo/40224692/40224692-1704860591325-8737e31cf4558.jpg"
        />

        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "20px",
            }}
          >
            {podInfo.title}
          </Typography>
          <Typography
            sx={(theme) => ({
              fontSize: "14px",
              color: theme.palette.text.secondary,
            })}
          >
            {user.name}
          </Typography>
        </Box>
      </Box>

      <Box>
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "14px",
              marginTop: "32px",
            }}
          >
            Description
          </Typography>
          <Typography
            sx={(theme) => ({
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "16px",
              color: theme.palette.text.secondary,
            })}
          >
            {podInfo.description}
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "14px",
              marginTop: "16px",
            }}
          >
            Publish date
          </Typography>
          <Typography
            sx={(theme) => ({
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "16px",
              color: theme.palette.text.secondary,
            })}
          >
            Now
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "14px",
              marginTop: "16px",
            }}
          >
            Episode type
          </Typography>
          <Typography
            sx={(theme) => ({
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "16px",
              color: theme.palette.text.secondary,
            })}
          >
            Full
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "14px",
              marginTop: "16px",
            }}
          >
            Episode availability
          </Typography>
          <Typography
            sx={(theme) => ({
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "16px",
              color: theme.palette.text.secondary,
            })}
          >
            Everyone
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
