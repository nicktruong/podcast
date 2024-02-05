import { doc, updateDoc } from "@firebase/firestore";

import { Collections, Roles } from "@/common/enums";

import { db } from "../init";

export const upgradeUserToPodcaster = async (
  userId: string,
  oldRoles: Roles[]
) => {
  if (oldRoles.includes(Roles.PODCASTER)) {
    return false;
  }

  await updateDoc(doc(db, Collections.USERS, userId), {
    roles: [...oldRoles, Roles.PODCASTER],
  });

  return true;
};
