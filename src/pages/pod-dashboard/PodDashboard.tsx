import { useEffect } from "react";
import Box from "@mui/material/Box";

import {
  selectCreatorsPodcasts,
  getCreatorsPodsPaginationAction,
} from "@/store/podSlice";
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
  const createdFirstEp =
    useAppSelector(selectCreatorsPodcasts)[0] !== undefined;

  useEffect(() => {
    if (uid) {
      dispatch(fetchCreatorPodSeries(uid));
      dispatch(getCreatorsPodsPaginationAction({ pageSize: 1 }));
    }
  }, [uid]);

  if (loading) {
    return <>Loading...</>;
  }

  let content: JSX.Element;

  if (!hasPodSeries || !createdFirstEp) {
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
