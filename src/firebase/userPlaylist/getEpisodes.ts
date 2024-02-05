import {
  doc,
  query,
  where,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";

import { Collections } from "@/common/enums";
import { EpisodeFields } from "@/common/fields";

import { db } from "../init";
import { downloadFile } from "../storage";
import { getPodcastDetail } from "../podcast";

import type {
  User,
  Episode,
  Podcast,
  PlaylistEpisode,
  PopulatedPlaylistEpisode,
} from "@/common/interfaces";

export const getEpisodesDetailFromPodcastId = async (podcastId: string) => {
  const snapshot = await getDocs(
    query(
      collection(db, Collections.EPISODES),
      where(EpisodeFields.PODCAST_ID, "==", podcastId)
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

export const getPodcastAndEpisodesDetailFromEpisodeId = async (
  episodeId: string
) => {
  const episodeSnapshot = await getDoc(
    doc(db, Collections.EPISODES, episodeId)
  );

  const episode = episodeSnapshot.data() as Episode;

  const podcast = await getPodcastDetail(episode.podcastId);

  const episodesDetail = await getEpisodesDetailFromPodcastId(
    episode.podcastId
  );

  return { podcast, episodesDetail };
};

export const getEpisodesDetailFromPlaylistEpisodes = async (
  episodes: PlaylistEpisode[]
) => {
  const episodesDetail = await Promise.all(
    episodes.map(async (playlistEpisode) => {
      // get episodes
      const episodeSnapshot = await getDoc(
        doc(db, Collections.EPISODES, playlistEpisode.episodeId)
      );

      const episode = {
        id: episodeSnapshot.id,
        ...episodeSnapshot.data(),
      } as Episode;

      // get podcast
      const podcastSnapshot = await getDoc(
        doc(db, Collections.PODCASTS, episode.podcastId)
      );

      const podcast = {
        id: podcastSnapshot.id,
        ...podcastSnapshot.data(),
      } as Podcast;

      if (podcast.coverUrl && !podcast.coverUrl.startsWith("https")) {
        podcast.coverUrl = await downloadFile(podcast.coverUrl);
      }

      // get author
      const authorSnapshot = await getDoc(
        doc(db, Collections.USERS, podcast.authorId)
      );

      const author = {
        id: authorSnapshot.id,
        ...authorSnapshot.data(),
      } as User;

      return {
        ...episode,
        podcast: {
          ...podcast,
          author,
        },
        addedDate: playlistEpisode.addedDate,
      } as PopulatedPlaylistEpisode;
    })
  );

  return episodesDetail;
};
