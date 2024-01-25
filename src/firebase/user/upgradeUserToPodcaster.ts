import { doc, updateDoc } from "@firebase/firestore";

import { ROLES } from "@/common/enums";

import { db } from "../init";

export const upgradeUserToPodcaster = async (
  userId: string,
  oldRoles: ROLES[]
) => {
  if (oldRoles.includes(ROLES.PODCASTER)) {
    return false;
  }

  await updateDoc(doc(db, "users", userId), {
    roles: [...oldRoles, ROLES.PODCASTER],
  });

  return true;
};
