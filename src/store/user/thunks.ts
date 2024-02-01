import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  auth,
  uploadFile,
  userEditProfile,
  userFollowPodcast,
  userUnfollowPodcast,
  upgradeUserToPodcaster,
} from "@/firebase";
import { resizeImage } from "@/common/utils";
import { createAppAsyncThunk } from "@/store/createAppAsyncThunk";

import type { UserUpgradeInfo } from "./interfaces";
import type { EditProfile, PodcastUserIdPair } from "@/common/interfaces";

export const unfollowPodcast = createAppAsyncThunk(
  "user/unfollowPodcast",
  async ({ podcastId, userId }: PodcastUserIdPair) => {
    await userUnfollowPodcast({ podcastId, userId });

    return { podcastId };
  }
);

export const followPodcast = createAppAsyncThunk(
  "user/followPodcast",
  async ({ podcastId, userId }: PodcastUserIdPair) => {
    await userFollowPodcast({ podcastId, userId });

    return { podcastId };
  }
);

export const editProfile = createAppAsyncThunk(
  "user/editProfile",
  async ({ userId, bio, name, avatar }: EditProfile) => {
    const srcPath: { src?: string; path?: string } = {};

    if (avatar) {
      const image = await resizeImage(avatar, { width: 300, height: 300 });

      const { fullPath } = uploadFile(`avatar/${userId}`, image);

      srcPath.path = fullPath;

      srcPath.src = URL.createObjectURL(avatar);
    }

    await userEditProfile({
      bio,
      name,
      userId,
      fullPath: srcPath.path,
    });

    return { name, userId, bio, src: srcPath.src };
  }
);

export const upgradeToPodcaster = createAppAsyncThunk(
  "user/upgradeToPodcaster",
  async ({ userId, userRoles, emailVerified }: UserUpgradeInfo) => {
    if (!emailVerified) {
      // TODO: add toast
      console.log("Please verify email before upgrading to podcaster");
      // console.log("If you're already verify, please reload page");
      // window.location.reload();

      return false;
    }

    const result = await upgradeUserToPodcaster(userId, userRoles);

    return result;
  }
);

export const signOut = createAsyncThunk("user/signOut", async () => {
  await auth.signOut();
});
