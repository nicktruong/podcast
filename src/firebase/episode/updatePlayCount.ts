import { doc, increment, updateDoc } from "firebase/firestore";

import { Collections } from "@/enums";

import { db } from "../init";
import { getDoc } from "../utils";

import type { User, PodcastEpisodeIdPair } from "@/common/interfaces";

export const updatePlayCount = async ({
  userId,
  episodeId,
  podcastId,
}: PodcastEpisodeIdPair & { userId?: string }) => {
  // TODO: Store session to reduce play trick
  if (!userId) return;
  const userRef = doc(db, Collections.USERS, userId);
  const user = await getDoc<User>(userRef);

  if (user.played?.includes(episodeId)) return;
  const newUserPlayed = [...(user.played ?? []), episodeId];
  await updateDoc(userRef, { played: newUserPlayed });

  // update podcast to +1 playCount
  const podcastRef = doc(db, Collections.PODCASTS, podcastId);
  await updateDoc(podcastRef, {
    playCount: increment(1),
    audienceSize: increment(1),
  });

  // update episode to +1 playCount
  const episodeRef = doc(db, Collections.EPISODES, episodeId);
  await updateDoc(episodeRef, {
    playCount: increment(1),
    audienceSize: increment(1),
  });
};
