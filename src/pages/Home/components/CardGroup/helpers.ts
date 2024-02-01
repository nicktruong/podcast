import { useAppSelector } from "@/hooks";
import { selectCategories } from "@/store/category";
import { selectUIState } from "@/store/ui";

export const usePrepare = () => {
  const { isSidebarExpand } = useAppSelector(selectUIState);

  const categories = useAppSelector(selectCategories);

  const getCategory = (categoryName: string) =>
    categories.find((category) => category.name === categoryName) ??
    categories[0];

  return { isSidebarExpand, getCategory };
};
