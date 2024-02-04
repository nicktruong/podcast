import Dropzone from "react-dropzone";
import { Trans } from "react-i18next";
import { Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { usePrepareHook } from "./helpers";
import { UploadAudioProps } from "./interfaces";

const UploadPhoto = ({ onFileUpload }: UploadAudioProps) => {
  const { t } = usePrepareHook();

  return (
    <>
      <Box>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "24px",
          }}
          component="h1"
        >
          {t("uploadYourEpisodePhoto")}
        </Typography>

        <Typography
          sx={(theme) => ({
            fontWeight: 500,
            marginTop: "12px",
            color: theme.palette.text.secondary,
          })}
        >
          {t("uploadAnImageThatMatchesYourPodcast")}
        </Typography>
      </Box>

      <Dropzone onDrop={onFileUpload}>
        {({ getRootProps, getInputProps }) => (
          <Box
            sx={(theme) => ({
              display: "flex",
              cursor: "pointer",
              marginTop: "40px",
              minHeight: "424px",
              padding: "56px 0px",
              borderRadius: "4px",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              border: `1px dashed ${theme.palette.custom?.grey.main}`,
            })}
            {...getRootProps()}
          >
            <input {...getInputProps()} className="p-8 bg-blue-100" />

            <CloudUploadIcon
              sx={(theme) => ({
                fontSize: "48px",
                color: theme.palette.text.secondary,
              })}
            />

            <Typography
              sx={(theme) => ({
                fontWeight: 700,
                fontSize: "18px",
                marginTop: "16px",
                textAlign: "center",
                color: theme.palette.text.secondary,
              })}
            >
              <Trans i18nKey="dragAndDrop" t={t}>
                Drag and drop <br /> or click to select files
              </Trans>
            </Typography>
          </Box>
        )}
      </Dropzone>
    </>
  );
};

export default UploadPhoto;
