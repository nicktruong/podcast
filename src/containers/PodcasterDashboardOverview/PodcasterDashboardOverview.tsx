import { useEffect } from "react";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { Button, Typography } from "@mui/material";

import { selectPodcast } from "@/store/podcast";
import { selectUser, selectUserId } from "@/store/user";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectPods, fetchEpisodesFromCreatorPaged } from "@/store/episode";

export default function PodDashboardOverview() {
  const dispatch = useAppDispatch();
  const pods = useAppSelector(selectPods);
  const user = useAppSelector(selectUser);
  const userId = useAppSelector(selectUserId);
  const podSeries = useAppSelector(selectPodcast);
  const { t } = useTranslation("pages/PodcasterDashboard");

  useEffect(() => {
    if (userId) {
      dispatch(
        fetchEpisodesFromCreatorPaged({ creatorId: userId, pageSize: 1 })
      );
    }
  }, [userId]);

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
            src={podSeries?.coverUrl}
            alt={`${podSeries?.title} cover photo`}
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
              {t("podcast")}
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
              {podSeries?.title}
            </Typography>

            <Typography
              sx={(theme) => ({
                fontWeight: 700,
                marginTop: "8px",
                fontSize: "14px",
                color: theme.palette.text.secondary,
              })}
            >
              {user?.episodeCount}{" "}
              {t("episode", { count: user?.episodeCount ?? 1 })}
            </Typography>
          </Box>

          <Box sx={{ marginTop: "48px" }}>
            <Button variant="round" sx={{ marginRight: "12px" }}>
              {t("share")}
            </Button>
            {/* <Button variant="round">{t("profilePage")}</Button> */}
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
            {t("podcastOverview")}
          </Typography>

          <Box
            sx={(theme) => ({
              rowGap: "48px",
              display: "flex",
              flexWrap: "wrap",
              marginTop: "8px",
              borderRadius: "4px",
              padding: "32px 24px",
              border: `1px solid ${theme.palette.custom?.grey.light}`,
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
                {t("plays")}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "32px",
                }}
              >
                {podSeries?.playCount}
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: "11px",
                  color: theme.palette.text.secondary,
                })}
              >
                {t("allTime")}
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
                {t("audienceSize")}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "32px",
                }}
              >
                {podSeries?.audienceSize}
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: "11px",
                  color: theme.palette.text.secondary,
                })}
              >
                {t("allTime")}
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
                {t("followers")}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "32px",
                }}
              >
                {/* TODO: Implement followers */}0
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: "11px",
                  color: theme.palette.text.secondary,
                })}
              >
                {t("growYourAudience")}
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
            {t("latestEpisode")}
          </Typography>

          <Box
            sx={(theme) => ({
              display: "flex",
              marginTop: "8px",
              minWidth: "307px",
              borderRadius: "4px",
              padding: "32px 24px",
              justifyContent: "space-between",
              border: `1px solid ${theme.palette.custom?.grey.light}`,
            })}
          >
            <Box sx={{ maxWidth: "calc(100% - 96px)" }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "13px",
                }}
              >
                {t("plays")}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "32px",
                }}
              >
                {pods[0]?.playCount}
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
                {pods[0]?.title}
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
                alt={`${pods[0]?.title} cover photo`}
                className="w-full h-full object-cover rounded"
                src={podSeries?.coverUrl}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
