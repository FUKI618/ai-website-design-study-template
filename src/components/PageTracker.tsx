"use client";
import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";

export function PageTracker() {
  useEffect(() => {
    trackPageView();
  }, []);
  return null;
}
