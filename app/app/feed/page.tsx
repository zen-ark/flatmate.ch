"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { listings } from "@/lib/mvp-data";
import { FeedCard } from "@/components/mvp/feed-card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Sparkles } from "lucide-react";

const STORAGE_KEY = "flatmate-vibe";
const FeedMap = dynamic(
  () => import("@/components/mvp/feed-map").then((mod) => mod.FeedMap),
  { ssr: false }
);

function useVibeSelections(): string[] {
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
  }, []);

  const getSnapshot = useCallback(
    () => localStorage.getItem(STORAGE_KEY) ?? "",
    []
  );

  const getServerSnapshot = useCallback(() => "", []);

  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return useMemo(() => {
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw) as Record<string, string>;
      return Object.values(parsed);
    } catch {
      return [];
    }
  }, [raw]);
}

export default function FeedPage() {
  const userVibes = useVibeSelections();
  const [view, setView] = useState<"list" | "map">("list");

  const sorted = useMemo(() => {
    if (userVibes.length === 0) return listings;
    return [...listings].sort((a, b) => {
      const aMatches = a.vibeTags.filter((t) => userVibes.includes(t)).length;
      const bMatches = b.vibeTags.filter((t) => userVibes.includes(t)).length;
      return bMatches - aMatches;
    });
  }, [userVibes]);

  return (
    <div className={view === "map" ? "h-screen overflow-hidden bg-background" : "min-h-screen bg-background"}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            flatmate<span className="text-primary/60">.ch</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1 rounded-xl border border-border bg-card p-1">
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("list")}
              >
                List
              </Button>
              <Button
                variant={view === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("map")}
              >
                Map
              </Button>
            </div>
            <Link
              href="/app"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <RotateCcw className="size-3" />
              Retake vibe quiz
            </Link>
          </div>
        </div>
      </header>

      <main className={view === "map" ? "h-[calc(100vh-3.5rem)]" : "mx-auto max-w-5xl px-6 py-8"}>
        {/* Summary */}
        {view === "list" && userVibes.length > 0 && (
          <div className="mb-8 flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
            <Sparkles className="size-4 text-primary" />
            <span>
              Showing <strong>{listings.length} WGs</strong> sorted by your vibe
              match
            </span>
          </div>
        )}

        {view === "list" ? (
          <div className="grid gap-5">
            {sorted.map((listing) => (
              <FeedCard
                key={listing.id}
                listing={listing}
                userVibes={userVibes}
              />
            ))}
          </div>
        ) : (
          <FeedMap listings={sorted} userVibes={userVibes} />
        )}

        {/* End */}
        {view === "list" && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
          You&apos;ve seen all {listings.length} WGs.{" "}
          <Link
            href="/app"
            className="font-medium text-primary hover:underline"
          >
            Update your vibe
          </Link>{" "}
          for better matches.
          </p>
        )}
      </main>
    </div>
  );
}
