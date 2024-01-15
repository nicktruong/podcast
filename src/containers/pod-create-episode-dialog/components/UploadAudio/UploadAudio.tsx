import Dropzone from "react-dropzone";
import { Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface Props {
  onFileUpload: (acceptedFiles: File[]) => void;
}

export default function UploadAudio({ onFileUpload }: Props) {
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
          Upload audio or video
        </Typography>

        <Typography
          sx={(theme) => ({
            fontWeight: 500,
            marginTop: "12px",
            color: theme.palette.text.secondary,
          })}
        >
          Create an audio or video episode in a few simple steps.
        </Typography>
      </Box>

      <Box sx={{ marginTop: "32px" }}>
        <Typography
          sx={(theme) => ({
            fontWeight: 700,
            color: theme.palette.text.secondary,
          })}
        >
          Supported file types:
        </Typography>

        <Box sx={(theme) => ({ color: theme.palette.text.secondary })}>
          <ul className="mt-3 list-disc">
            <li className="ml-10 font-medium">Audio files: mp3</li>
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
        For more guidance and best practices, check out our audio and video
        guidelines.
      </Typography>

      <Dropzone onDrop={onFileUpload}>
        {({ getRootProps, getInputProps }) => (
          <Box
            sx={{
              display: "flex",
              cursor: "pointer",
              marginTop: "40px",
              minHeight: "424px",
              padding: "56px 0px",
              borderRadius: "4px",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              border: "1px dashed #dadada",
            }}
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
              Drag and drop <br />
              or click to select files
            </Typography>
          </Box>
        )}
      </Dropzone>
    </>
  );
}
