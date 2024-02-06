import { useAppSelector } from "@/hooks";
import { selectUserId, selectUserCategoriesOfInterest } from "@/store/user";

export const usePrepareHook = () => {
  const userId = useAppSelector(selectUserId);

  const userCategoriesOfInterest = useAppSelector(
    selectUserCategoriesOfInterest
  );

  return { userId, userCategoriesOfInterest };
};
