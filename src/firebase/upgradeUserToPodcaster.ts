import { doc, updateDoc } from "@firebase/firestore";

import { Roles } from "@/common/constants/roles";

import { db } from "./init";

export const upgradeUserToPodcaster = async (
  userId: string,
  oldRoles: Roles[]
) => {
  if (oldRoles.includes(Roles.podcaster)) {
    return false;
  }

  await updateDoc(doc(db, "users", userId), {
    roles: [...oldRoles, Roles.podcaster],
  });

  return true;
};
