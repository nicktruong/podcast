import { useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

import {
  selectPodSeries,
  fetchSeriesImage,
  selectCoverImage,
} from "@/store/podSeriesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import RoundedButton from "@/components/rounded-button/RoundedButton";

export default function PodDashboardOverview() {
  const dispatch = useAppDispatch();
  const podSeries = useAppSelector(selectPodSeries);
  const seriesImage = useAppSelector(selectCoverImage);

  useEffect(() => {
    if (!seriesImage) {
      dispatch(fetchSeriesImage());
    }
  }, []);

  return (
    <Box
      sx={(theme) => ({
        margin: "0 auto",
        padding: "40px 16px",
        maxWidth: `${theme.breakpoints.values.lg + 80}px`,
      })}
    >
      <Box
        sx={(theme) => ({
          [theme.breakpoints.up("md")]: {
            display: "flex",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={seriesImage}
            alt={`${podSeries.title} cover photo`}
            className="rounded md:w-[200px] md:h-[200px] w-[280px] h-[280px]"
          />
        </Box>

        <Box
          sx={(theme) => ({
            [theme.breakpoints.up("md")]: {
              marginLeft: "32px",
            },
          })}
        >
          <Box
            sx={(theme) => ({
              marginTop: "32px",
              [theme.breakpoints.up("md")]: {
                marginTop: "0px",
              },
            })}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "14px",
                textTransform: "uppercase",
              }}
            >
              Podcast
            </Typography>

            <Typography
              component="h1"
              sx={{
                fontWeight: 700,
                marginTop: "8px",
                fontSize: "32px",
                lineHeight: "32px",
              }}
            >
              Meditation
            </Typography>

            <Typography
              sx={(theme) => ({
                fontWeight: 700,
                marginTop: "8px",
                fontSize: "14px",
                color: theme.palette.text.secondary,
              })}
            >
              1 episode
            </Typography>
          </Box>

          <Box sx={{ marginTop: "48px" }}>
            <RoundedButton sx={{ marginRight: "12px" }}>Share</RoundedButton>
            <RoundedButton>Profile page</RoundedButton>
          </Box>
        </Box>
      </Box>

      <Box
        sx={(theme) => ({
          [theme.breakpoints.up("lg")]: {
            display: "flex",
            columnGap: "32px",
          },
        })}
      >
        <Box
          sx={(theme) => ({
            marginTop: "64px",
            [theme.breakpoints.up("lg")]: {
              flexGrow: 4,
            },
          })}
        >
          <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
            Podcast overview
          </Typography>

          <Box
            sx={(theme) => ({
              rowGap: "48px",
              display: "flex",
              flexWrap: "wrap",
              marginTop: "8px",
              borderRadius: "4px",
              padding: "32px 24px",
              border: "1px solid #dedede",
              justifyContent: "space-between",
              [theme.breakpoints.up("lg")]: {
                height: "162px",
              },
            })}
          >
            <Box sx={{ width: "150px" }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "13px",
                }}
              >
                Plays
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "32px",
                }}
              >
                0
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: "11px",
                  color: theme.palette.text.secondary,
                })}
              >
                All-time
              </Typography>
            </Box>

            <Box
              sx={(theme) => ({
                width: "150px",
                [theme.breakpoints.up("md")]: {
                  marginTop: "0px",
                },
              })}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "13px",
                }}
              >
                Audience size
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "32px",
                }}
              >
                0
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: "11px",
                  color: theme.palette.text.secondary,
                })}
              >
                All-time
              </Typography>
            </Box>

            <Box
              sx={(theme) => ({
                width: "150px",
                [theme.breakpoints.up("md")]: { marginTop: "0px" },
              })}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "13px",
                }}
              >
                Spotify followeres
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "32px",
                }}
              >
                0
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: "11px",
                  color: theme.palette.text.secondary,
                })}
              >
                Grow your audience
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={(theme) => ({
            marginTop: "48px",
            [theme.breakpoints.up("lg")]: {
              marginTop: "64px",
              maxWidth: "307px",
            },
          })}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "18px",
            }}
          >
            Latest episode
          </Typography>

          <Box
            sx={{
              display: "flex",
              marginTop: "8px",
              borderRadius: "4px",
              padding: "32px 24px",
              border: "1px solid #dedede",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ maxWidth: "calc(100% - 96px)" }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "13px",
                }}
              >
                Plays
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "32px",
                }}
              >
                0
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: "11px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  color: theme.palette.text.secondary,
                })}
              >
                Meditation - Overcoming the fear of speaking English
              </Typography>
            </Box>

            <Box
              sx={{
                flexShrink: 0,
                width: "96px",
                height: "96px",
              }}
            >
              <img
                alt=""
                className="w-full h-full object-cover rounded"
                src="https://i.scdn.co/image/ab6765630000ba8a18441b42e191493c12e85a3d"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
