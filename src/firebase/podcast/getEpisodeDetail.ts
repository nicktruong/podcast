import { doc, getDoc } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";
import { Episode } from "@/common/interfaces";

import { db } from "../init";

export const getEpisodeDetail = async (episodeId: string) => {
  const snapshot = await getDoc(doc(db, COLLECTIONS.EPISODES, episodeId));

  return snapshot.data() as Episode;
};
