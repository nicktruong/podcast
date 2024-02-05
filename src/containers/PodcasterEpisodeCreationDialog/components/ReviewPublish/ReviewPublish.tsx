import { Box, Typography } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

import { usePrepare } from "./usePrepare";
import { ReviewPublishProps } from "./interfaces";

export default function ReviewPublish({
  podInfo,
  user,
  image,
}: ReviewPublishProps) {
  const { t } = usePrepare();

  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "24px",
        }}
      >
        {t("review")}
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
            {user?.name}
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
            {t("description")}
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
            {t("now")}
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
            {t("episodeType")}
          </Typography>
          <Typography
            sx={(theme) => ({
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "16px",
              color: theme.palette.text.secondary,
            })}
          >
            {t("full")}
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
            {t("episodeAvailability")}
          </Typography>
          <Typography
            sx={(theme) => ({
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "16px",
              color: theme.palette.text.secondary,
            })}
          >
            {t("everyone")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
