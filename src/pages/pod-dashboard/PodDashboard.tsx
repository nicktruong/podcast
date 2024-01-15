import { useEffect } from "react";
import Box from "@mui/material/Box";

import {
  fetchCreatorPodSeries,
  selectPodSeriesMetadata,
} from "@/store/podSeriesSlice";
import { selectUser } from "@/store/userSlice";
import PodAppbar from "@/containers/pod-app-bar/PodAppBar";
import { PodOnboarding } from "@/containers/pod-onboarding";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import PodDashboardOverview from "@/containers/pod-dashboard-overview/PodDashboardOverview";

export default function PodDashboard() {
  const dispatch = useAppDispatch();
  const { uid } = useAppSelector(selectUser);
  const { loading, hasPodSeries } = useAppSelector(selectPodSeriesMetadata);

  useEffect(() => {
    if (uid) {
      dispatch(fetchCreatorPodSeries(uid));
    }
  }, [uid]);

  if (loading) {
    return <>Loading...</>;
  }

  let content: JSX.Element;

  // TODO: check for series and podcast
  if (!hasPodSeries) {
    content = <PodOnboarding />;
  } else {
    content = <PodDashboardOverview />;
  }

  return (
    <Box>
      <PodAppbar />
      {content}
    </Box>
  );
}
