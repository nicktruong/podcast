import { ROLES } from "@/common/enums";

import type { User } from "@/common/interfaces";

export interface UserState {
  isLoadingUser: boolean;
  user: Partial<User> | null;
}

export interface UserUpgradeInfo {
  userId: string;
  userRoles: ROLES[];
  emailVerified: boolean;
}
