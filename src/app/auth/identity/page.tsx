"use client";

import { LucideLoader } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CallbackPage() {
  const pathname = "/api" + usePathname();
  const searchParams = useSearchParams();
  const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  useEffect(() => {
    window.location.href = currentUrl;
  }, []);

  return <LucideLoader className="animate-spin" />;
}
