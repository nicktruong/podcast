import { useAppSelector } from "@/hooks";
import { selectFetchingCategories } from "@/store/category";
import { selectUserId, selectUserCategoriesOfInterest } from "@/store/user";

export const usePrepare = () => {
  const userId = useAppSelector(selectUserId);

  const fetchingCategories = useAppSelector(selectFetchingCategories);

  const userCategoriesOfInterest = useAppSelector(
    selectUserCategoriesOfInterest
  );

  return { userId, fetchingCategories, userCategoriesOfInterest };
};
