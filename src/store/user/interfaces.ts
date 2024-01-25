import type { User } from "@/common/interfaces";

export interface UserState {
  isGettingUser: boolean;
  user: Partial<User> | null;
}
