import { useAppSelector } from "@/hooks";
import { selectUserId, selectUserCategoriesOfInterest } from "@/store/user";

export const usePrepare = () => {
  const userId = useAppSelector(selectUserId);

  const userCategoriesOfInterest = useAppSelector(
    selectUserCategoriesOfInterest
  );

  return { userId, userCategoriesOfInterest };
};
