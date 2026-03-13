import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Ruler, Banknote, Users, BedDouble, House, Sparkles, ChevronRight } from "lucide-react";
import type { Listing } from "@/lib/mvp-data";
import { VibeTag } from "./vibe-tag";

export function FeedCard({
  listing,
  userSelections,
}: {
  listing: Listing & { score?: number };
  userSelections: Record<string, any>;
}) {
  const matchScore = listing.score ?? 0;
  
  // Quick tag categorization for visual feedback
  const matchingTags = listing.vibeTags.filter(tag => 
    Object.values(userSelections).some(val => 
      typeof val === 'string' ? val === tag : false
    )
  );
  const otherTags = listing.vibeTags.filter(tag => !matchingTags.includes(tag));

  return (
    <Link href={`/app/feed/${listing.id}`} className="block group">
      <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/30">
        {/* Header */}
        <div className="border-b border-border/50 bg-muted/30 px-5 py-4 transition-colors group-hover:bg-muted/50">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
                {listing.title}
              </h3>
              <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="size-3.5" />
                {listing.location.neighborhood}, {listing.location.city}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold shadow-sm ${
                matchScore > 80 ? "bg-primary text-primary-foreground" :
                matchScore > 50 ? "bg-primary/20 text-primary" :
                "bg-muted text-muted-foreground"
              }`}>
                <Sparkles className="size-3.5" />
                {matchScore}% Match
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          {/* Listing photos */}
          <div className="mb-4 grid gap-3 sm:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-border/60">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={listing.images.room}
                  alt={`Room view for ${listing.title}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="flex items-center gap-1.5 border-t border-border/60 bg-muted/40 px-2.5 py-1.5 text-xs font-medium text-foreground">
                <BedDouble className="size-3.5" />
                Room
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-border/60 sm:block hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={listing.images.flat}
                  alt={`Entire flat view for ${listing.title}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="flex items-center gap-1.5 border-t border-border/60 bg-muted/40 px-2.5 py-1.5 text-xs font-medium text-foreground">
                <House className="size-3.5" />
                Entire flat
              </div>
            </div>
          </div>

          {/* Vibe Tags */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {matchingTags.map((v) => (
              <VibeTag key={v} vibeId={v} highlight />
            ))}
            {otherTags.map((v) => (
              <VibeTag key={v} vibeId={v} />
            ))}
          </div>

          {/* Description */}
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {listing.description}
          </p>

          {/* Flatmates */}
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Users className="size-3.5" />
              Current flatmates
            </div>
            <div className="flex flex-wrap gap-2">
              {listing.flatmates.map((fm) => (
                <div
                  key={fm.name}
                  className="inline-flex items-center gap-2 rounded-lg bg-muted/60 px-2 py-1.5 text-xs"
                >
                  <Image
                    src={`https://api.dicebear.com/9.x/adventurer/png?seed=${encodeURIComponent(
                      fm.name
                    )}&size=64`}
                    alt={`${fm.name} profile picture`}
                    width={24}
                    height={24}
                    className="rounded-full border border-border/60 object-cover"
                  />
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
          <div className="flex items-center justify-between border-t border-border/50 pt-4">
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 font-semibold text-foreground">
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
                })}
              </span>
            </div>
            <div className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
              View details
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
