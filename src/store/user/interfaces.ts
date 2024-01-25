import type { User } from "@/common/interfaces";

export interface UserState {
  user: Partial<User> | null;
  isGettingUser: boolean;
}
