"use client";

import { useMemo, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  ZoomControl,
} from "react-leaflet";
import { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Listing } from "@/lib/mvp-data";
import { Button } from "@/components/ui/button";
import { VibeTag } from "@/components/mvp/vibe-tag";
import { Banknote, Calendar, ChevronLeft, MapPin, Ruler, Users, X } from "lucide-react";

const CITY_COORDINATES: Record<string, [number, number]> = {
  "St. Gallen": [47.4245, 9.3767],
  Winterthur: [47.4988, 8.7241],
  Zürich: [47.3769, 8.5417],
  Basel: [47.5596, 7.5886],
  Luzern: [47.0502, 8.3093],
  Bern: [46.9481, 7.4474],
  Lausanne: [46.5197, 6.6323],
};

function markerIcon(isActive: boolean, isHovered: boolean) {
  const classes = [
    "feed-map-pin",
    isActive ? "feed-map-pin--active" : "",
    isHovered ? "feed-map-pin--hovered" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return divIcon({
    className: "feed-map-pin-shell",
    html: `<span class="${classes}" />`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

export function FeedMap({
  listings,
  userVibes,
}: {
  listings: Listing[];
  userVibes: string[];
}) {
  const [activeListingId, setActiveListingId] = useState<string | null>(
    listings[0]?.id ?? null
  );
  const [hoveredListingId, setHoveredListingId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const listingCoords = useMemo(() => {
    const cityCounter: Record<string, number> = {};

    return listings.reduce<Record<string, [number, number]>>((acc, listing) => {
      const [baseLat, baseLng] = CITY_COORDINATES[listing.location.city] ?? [
        46.8182, 8.2275,
      ];
      const index = cityCounter[listing.location.city] ?? 0;
      cityCounter[listing.location.city] = index + 1;

      const latOffsets = [0.009, -0.008, 0.014, -0.012, 0.004];
      const lngOffsets = [0.011, -0.01, -0.014, 0.015, 0.006];
      acc[listing.id] = [
        baseLat + latOffsets[index % latOffsets.length],
        baseLng + lngOffsets[index % lngOffsets.length],
      ];
      return acc;
    }, {});
  }, [listings]);

  const activeListing =
    listings.find((listing) => listing.id === activeListingId) ?? null;

  return (
    <section className="grid h-full w-full overflow-hidden md:grid-cols-[420px_minmax(0,1fr)]">
      <aside className="z-[1000] h-full border-r border-border/70 bg-background/95 backdrop-blur-md">
        <div className="flex h-full flex-col p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-wide text-muted-foreground">
              {isDetailOpen && activeListing ? "Selected listing" : "Listings on map"}
            </h2>
            {isDetailOpen && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDetailOpen(false)}
              >
                <ChevronLeft className="size-4" />
                Back
              </Button>
            )}
          </div>

          {!isDetailOpen && (
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
              {listings.map((listing) => {
                const isActive = activeListingId === listing.id;
                return (
                  <button
                    key={listing.id}
                    type="button"
                    onClick={() => {
                      setActiveListingId(listing.id);
                      setIsDetailOpen(true);
                    }}
                    onMouseEnter={() => setHoveredListingId(listing.id)}
                    onMouseLeave={() =>
                      setHoveredListingId((current) =>
                        current === listing.id ? null : current
                      )
                    }
                    className={`w-full rounded-xl border p-3 text-left transition-colors ${
                      isActive
                        ? "border-primary/50 bg-primary/5"
                        : "border-border bg-card hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold">{listing.title}</p>
                        <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="size-3" />
                          {listing.location.neighborhood}, {listing.location.city}
                        </p>
                      </div>
                      <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                        CHF {listing.room.price}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {isDetailOpen && activeListing && (
            <div className="min-h-0 flex-1 overflow-y-auto pr-1">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {activeListing.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {activeListing.location.neighborhood}, {activeListing.location.city}
                  </p>
                </div>
                <Button
                  size="icon-sm"
                  variant="ghost"
                  onClick={() => setIsDetailOpen(false)}
                  aria-label="Close selected listing"
                >
                  <X className="size-4" />
                </Button>
              </div>

              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                {activeListing.description}
              </p>

              <div className="mb-5 flex flex-wrap gap-2">
                {activeListing.vibeTags.map((vibe) => (
                  <VibeTag
                    key={vibe}
                    vibeId={vibe}
                    highlight={userVibes.includes(vibe)}
                  />
                ))}
              </div>

              <div className="mb-5 grid gap-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
                  <Banknote className="size-4" /> CHF {activeListing.room.price}/month
                </span>
                <span className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
                  <Ruler className="size-4" /> {activeListing.room.size} m²
                </span>
                <span className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
                  <Calendar className="size-4" />
                  Available{" "}
                  {new Date(activeListing.room.available).toLocaleDateString("de-CH", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="rounded-xl border border-border/60 bg-card p-3">
                <div className="mb-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Users className="size-3.5" />
                  Current flatmates
                </div>
                <div className="grid gap-2">
                  {activeListing.flatmates.map((flatmate) => (
                    <div
                      key={flatmate.name}
                      className="rounded-lg bg-muted/70 px-3 py-2 text-sm"
                    >
                      <span className="font-medium">{flatmate.name}</span>
                      <span className="text-muted-foreground">
                        {" "}
                        &middot; {flatmate.age} &middot; {flatmate.occupation}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      <div className="relative h-full min-w-0">
        <MapContainer
          center={[46.8182, 8.2275]}
          zoom={8}
          minZoom={7}
          maxZoom={15}
          zoomControl={false}
          className="h-full w-full"
        >
          <ZoomControl position="bottomright" />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {listings.map((listing) => {
            const isHovered = hoveredListingId === listing.id;
            const isActive = activeListingId === listing.id;

            return (
              <Marker
                key={listing.id}
                position={listingCoords[listing.id]}
                icon={markerIcon(isActive, isHovered)}
                zIndexOffset={isActive ? 1800 : isHovered ? 1400 : 0}
                eventHandlers={{
                  mouseover: () => setHoveredListingId(listing.id),
                  mouseout: () =>
                    setHoveredListingId((current) =>
                      current === listing.id ? null : current
                    ),
                  click: () => {
                    setActiveListingId(listing.id);
                    setIsDetailOpen(true);
                  },
                }}
              >
                {(isHovered || isActive) && (
                  <Tooltip
                    direction="top"
                    offset={[0, -16]}
                    opacity={1}
                    permanent
                    className="feed-map-tooltip"
                  >
                    <div className="min-w-44">
                      <p className="truncate text-xs font-semibold">{listing.title}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {listing.location.neighborhood}, {listing.location.city}
                      </p>
                      <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-primary">
                        <Banknote className="size-3" /> CHF {listing.room.price}/mo
                      </p>
                    </div>
                  </Tooltip>
                )}
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      <style jsx global>{`
        .leaflet-pane,
        .leaflet-marker-pane,
        .leaflet-tooltip-pane {
          z-index: 700;
        }

        .leaflet-tooltip-pane {
          z-index: 1800;
        }

        .feed-map-tooltip {
          border: 1px solid hsl(var(--border));
          border-radius: 0.75rem;
          background: hsl(var(--popover));
          color: hsl(var(--popover-foreground));
          box-shadow: 0 12px 24px hsl(var(--foreground) / 0.1);
          padding: 0.5rem 0.625rem;
        }

        .feed-map-tooltip:before {
          border-top-color: hsl(var(--border)) !important;
        }

        .feed-map-pin-shell {
          background: transparent !important;
          border: none !important;
        }

        .feed-map-pin {
          display: block;
          width: 1rem;
          height: 1rem;
          border-radius: 9999px;
          border: 2px solid hsl(var(--background));
          background: hsl(var(--foreground));
          box-shadow: 0 0 0 3px hsl(var(--background) / 0.8);
          transition: transform 150ms ease, box-shadow 150ms ease, background 150ms ease;
        }

        .feed-map-pin--hovered {
          transform: scale(1.16);
          box-shadow: 0 0 0 4px hsl(var(--primary) / 0.28);
        }

        .feed-map-pin--active {
          transform: scale(1.2);
          background: hsl(var(--primary));
          box-shadow: 0 0 0 5px hsl(var(--primary) / 0.35);
        }
      `}</style>
    </section>
  );
}
