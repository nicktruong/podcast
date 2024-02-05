import { getUserInfo } from "@/firebase";
import { createAppAsyncThunk } from "@/store/createAppAsyncThunk";

export const fetchUserInfo = createAppAsyncThunk(
  "profile/fetchUserInfo",
  async (userId: string) => {
    const user = await getUserInfo(userId);

    return user;
  }
);
