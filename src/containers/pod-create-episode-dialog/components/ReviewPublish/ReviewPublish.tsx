import { Box, Typography } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

import { Pod, UserInfo } from "@/common/interfaces";

interface Props {
  podInfo: Pod;
  user: UserInfo;
  image?: string;
}

export default function ReviewPublish({ podInfo, user, image }: Props) {
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
        {image ? (
          <img
            width="56px"
            height="56px"
            className="rounded"
            alt="Podcast cover photo"
            src={image}
          />
        ) : (
          <ImageIcon
            sx={{
              width: "56px",
              height: "56px",
              borderRadius: "4px",
            }}
          />
        )}

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
