import { doc, updateDoc } from "@firebase/firestore";

import { Roles } from "@/common/enums";

import { db } from "../init";

export const upgradeUserToPodcaster = async (
  userId: string,
  oldRoles: Roles[]
) => {
  if (oldRoles.includes(Roles.PODCASTER)) {
    return false;
  }

  await updateDoc(doc(db, "users", userId), {
    roles: [...oldRoles, Roles.PODCASTER],
  });

  return true;
};
