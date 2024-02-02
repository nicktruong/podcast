import Dropzone from "react-dropzone";
import { Trans } from "react-i18next";
import { Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { usePrepare } from "./usePrepare";
import { UploadAudioProps } from "./interfaces";

const UploadAudio = ({ onFileUpload }: UploadAudioProps) => {
  const { t } = usePrepare();

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
          {t("uploadAudioOrVideo")}
        </Typography>

        <Typography
          sx={(theme) => ({
            fontWeight: 500,
            marginTop: "12px",
            color: theme.palette.text.secondary,
          })}
        >
          {t("createAudioAndVideoInSimpleSteps")}
        </Typography>
      </Box>

      <Box sx={{ marginTop: "32px" }}>
        <Typography
          sx={(theme) => ({
            fontWeight: 700,
            color: theme.palette.text.secondary,
          })}
        >
          {t("supportedFileTypes")}
        </Typography>

        <Box sx={(theme) => ({ color: theme.palette.text.secondary })}>
          <ul className="mt-3 list-disc">
            <li className="ml-10 font-medium">
              {t("supportedFileTypesValues")}
            </li>
          </ul>
        </Box>
      </Box>

      <Typography
        sx={(theme) => ({
          fontWeight: 500,
          marginTop: "24px",
          color: theme.palette.text.secondary,
        })}
      >
        {t("guidanceAndBestPractices")}
      </Typography>

      <Dropzone
        onDrop={onFileUpload}
        validator={(file) => {
          if (file.type !== "audio/mpeg") {
            return {
              code: "wrong-extension",
              message: "Only mp3 file is accepted",
            };
          }

          return null;
        }}
      >
        {({ getRootProps, getInputProps, fileRejections }) => (
          <>
            {
              <p className="mt-10 text-red-500 font-bold">
                {fileRejections.at(-1) &&
                  `(*) ${fileRejections.at(-1)?.errors[0]?.message}`}
              </p>
            }
            <Box
              sx={(theme) => ({
                display: "flex",
                cursor: "pointer",
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
          </>
        )}
      </Dropzone>
    </>
  );
};

export default UploadAudio;
