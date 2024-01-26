import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const useScrollTop = () => {
  const location = useLocation();
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    elementRef.current?.scrollTo({ top: 0 });
  }, [location.pathname]);

  return { elementRef };
};
