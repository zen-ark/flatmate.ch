import { MapPin, Calendar, Ruler, Banknote, Users } from "lucide-react";
import type { Listing } from "@/lib/mvp-data";
import { VibeTag } from "./vibe-tag";

export function FeedCard({
  listing,
  userVibes,
}: {
  listing: Listing;
  userVibes: string[];
}) {
  const matchingVibes = listing.vibeTags.filter((t) => userVibes.includes(t));
  const otherVibes = listing.vibeTags.filter((t) => !userVibes.includes(t));

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="border-b border-border/50 bg-muted/30 px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              {listing.title}
            </h3>
            <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="size-3.5" />
              {listing.location.neighborhood}, {listing.location.city}
            </div>
          </div>
          {matchingVibes.length > 0 && (
            <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {matchingVibes.length} vibe match{matchingVibes.length > 1 ? "es" : ""}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        {/* Vibe Tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {matchingVibes.map((v) => (
            <VibeTag key={v} vibeId={v} highlight />
          ))}
          {otherVibes.map((v) => (
            <VibeTag key={v} vibeId={v} />
          ))}
        </div>

        {/* Description */}
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {listing.description}
        </p>

        {/* Flatmates */}
        <div className="mb-4">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Users className="size-3.5" />
            Current flatmates
          </div>
          <div className="flex flex-wrap gap-2">
            {listing.flatmates.map((fm) => (
              <div
                key={fm.name}
                className="rounded-lg bg-muted/60 px-3 py-1.5 text-xs"
              >
                <span className="font-medium">{fm.name}</span>
                <span className="text-muted-foreground">
                  {" "}
                  &middot; {fm.age} &middot; {fm.occupation}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Room details — secondary */}
        <div className="flex flex-wrap gap-4 border-t border-border/50 pt-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Banknote className="size-3.5" />
            CHF {listing.room.price}/mo
          </span>
          <span className="inline-flex items-center gap-1">
            <Ruler className="size-3.5" />
            {listing.room.size} m²
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="size-3.5" />
            {new Date(listing.room.available).toLocaleDateString("de-CH", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </article>
  );
}
