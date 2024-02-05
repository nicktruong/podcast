import { doc, updateDoc } from "@firebase/firestore";

import { COLLECTIONS, ROLES } from "@/common/enums";

import { db } from "../init";

export const upgradeUserToPodcaster = async (
  userId: string,
  oldRoles: ROLES[]
) => {
  if (oldRoles.includes(ROLES.PODCASTER)) {
    return false;
  }

  await updateDoc(doc(db, COLLECTIONS.USERS, userId), {
    roles: [...oldRoles, ROLES.PODCASTER],
  });

  return true;
};
