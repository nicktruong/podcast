import { useAppSelector } from "@/hooks";
import { selectCategories } from "@/store/category";
import { selectUIState } from "@/store/ui";

export const usePrepareHook = () => {
  const { isSidebarExpand } = useAppSelector(selectUIState);

  const categories = useAppSelector(selectCategories);

  const getCategory = (categoryName?: string) =>
    categories.find((category) => category.name === categoryName);

  return { isSidebarExpand, getCategory };
};
