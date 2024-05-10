"use client";

import { usePathname } from "next/navigation";

export const useProjectIdFromPath = () => {
  const pathname = usePathname().split("/");
  if (pathname.length >= 3 && pathname[1] === "projects") {
    const id = Number(pathname[2]);
    if (!id || isNaN(id)) {
      return undefined;
    } else {
      return id;
    }
  } else {
    return undefined;
  }
};
