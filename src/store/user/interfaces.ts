import type { UserInfo } from "@/common/interfaces";

export interface UserState {
  user: UserInfo;
  isGettingUser: boolean;
}
