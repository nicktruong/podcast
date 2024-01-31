import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";
import {
  Episode,
  PlaylistEpisode,
  Podcast,
  PopulatedPlaylistEpisode,
  User,
} from "@/common/interfaces";
import { EPISODE_FIELDS } from "@/common/enums/EpisodeFields";

import { db } from "../init";
import { getPodcastDetail } from "../series";
import { downloadFileFromStorage } from "../storage";

export const getPodcastAndEpisodesDetailFromEpisodeId = async (
  episodeId: string
) => {
  const episodeSnapshot = await getDoc(
    doc(db, COLLECTIONS.EPISODES, episodeId)
  );

  const episode = episodeSnapshot.data() as Episode;

  const podcast = await getPodcastDetail(episode.podcastId);

  const episodesDetail = await getEpisodesDetailFromPodcastId(
    episode.podcastId
  );

  return { podcast, episodesDetail };
};

export const getEpisodesDetailFromIds = async (episodes: PlaylistEpisode[]) => {
  const episodesDetail = await Promise.all(
    episodes.map(async (playlistEpisode) => {
      // get episodes
      const episodeSnapshot = await getDoc(
        doc(db, COLLECTIONS.EPISODES, playlistEpisode.episodeId)
      );

      const episode = {
        id: episodeSnapshot.id,
        ...episodeSnapshot.data(),
      } as Episode;

      // get podcast
      const podcastSnapshot = await getDoc(
        doc(db, COLLECTIONS.PODCASTS, episode.podcastId)
      );

      const podcast = podcastSnapshot.data() as Omit<Podcast, "id">;

      if (podcast.coverUrl && !podcast.coverUrl.startsWith("https")) {
        podcast.coverUrl = await downloadFileFromStorage(podcast.coverUrl);
      }

      // get author
      const authorSnapshot = await getDoc(
        doc(db, COLLECTIONS.USERS, podcast.authorId)
      );

      const author = authorSnapshot.data() as User;

      return {
        ...episode,
        podcast: {
          ...podcast,
          author,
          id: podcastSnapshot.id,
        },
        addedDate: playlistEpisode.addedDate,
      } as PopulatedPlaylistEpisode;
    })
  );

  return episodesDetail;
};

export const getEpisodesDetailFromPodcastId = async (podcastId: string) => {
  const snapshot = await getDocs(
    query(
      collection(db, COLLECTIONS.EPISODES),
      where(EPISODE_FIELDS.PODCAST_ID, "==", podcastId)
    )
  );

  const episodesDetail = await Promise.all(
    snapshot.docs.map(async (episodeSnapshot) => {
      const episode = {
        id: episodeSnapshot.id,
        ...episodeSnapshot.data(),
      } as Episode;

      return episode;
    })
  );

  return episodesDetail;
};
