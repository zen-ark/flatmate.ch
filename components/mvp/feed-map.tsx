"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Listing } from "@/lib/mvp-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Banknote, ChevronLeft, ChevronRight, MapPin, Sparkles, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const CITY_COORDINATES: Record<string, [number, number]> = {
  "St. Gallen": [47.4245, 9.3767],
  Winterthur: [47.4988, 8.7241],
  Zürich: [47.3769, 8.5417],
  Basel: [47.5596, 7.5886],
  Luzern: [47.0502, 8.3093],
  Bern: [46.9481, 7.4474],
  Lausanne: [46.5197, 6.6323],
};

function MapMarkerOverlay({
  listings,
  listingCoords,
  activeListingId,
  hoveredListingId,
  onHover,
  onLeave,
  onSelect,
}: {
  listings: Listing[];
  listingCoords: Record<string, [number, number]>;
  activeListingId: string | null;
  hoveredListingId: string | null;
  onHover: (listingId: string) => void;
  onLeave: (listingId: string) => void;
  onSelect: (listingId: string) => void;
}) {
  const [renderVersion, setRenderVersion] = useState(0);

  const map = useMapEvents({
    move: () => setRenderVersion((v) => v + 1),
    zoom: () => setRenderVersion((v) => v + 1),
    resize: () => setRenderVersion((v) => v + 1),
  });

  const markerPoints = useMemo(() => {
    void renderVersion;
    return listings.reduce<Record<string, { x: number; y: number }>>((acc, listing) => {
      const coords = listingCoords[listing.id];
      if (!coords) return acc;
      const point = map.latLngToContainerPoint(coords);
      acc[listing.id] = { x: point.x, y: point.y };
      return acc;
    }, {});
  }, [listings, listingCoords, map, renderVersion]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[800]">
      {listings.map((listing) => {
        const marker = markerPoints[listing.id];
        if (!marker) return null;

        const isHovered = hoveredListingId === listing.id;
        const isActive = activeListingId === listing.id;
        const score = (listing as any).score;

        return (
          <div
            key={listing.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: marker.x,
              top: marker.y,
              zIndex: isActive ? 40 : isHovered ? 30 : 20,
            }}
          >
            {(isHovered || isActive) && (
              <Card className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 w-56 -translate-x-1/2 border-border/70 bg-popover/95 py-0 shadow-xl">
                <CardContent className="p-3">
                  <p className="truncate text-xs font-semibold">{listing.title}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {listing.location.neighborhood}, {listing.location.city}
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-primary">
                    <Banknote className="size-3" /> CHF {listing.room.price}/mo
                  </p>
                </CardContent>
              </Card>
            )}

            <button
              type="button"
              onMouseEnter={() => onHover(listing.id)}
              onMouseLeave={() => onLeave(listing.id)}
              onClick={() => onSelect(listing.id)}
              className={cn(
                "feed-map-pill pointer-events-auto",
                isActive && "feed-map-pill--active",
                isHovered && "feed-map-pill--hovered"
              )}
              aria-label={`Open ${listing.title}`}
            >
              <span className="pill-price">CHF {listing.room.price}</span>
              {score && score > 80 && <span className="pill-dot" />}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function FeedMap({
  listings,
  userSelections,
}: {
  listings: (Listing & { score?: number })[];
  userSelections: Record<string, any>;
}) {
  const [activeListingId, setActiveListingId] = useState<string | null>(null);
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
    <section className="grid h-full w-full overflow-hidden md:grid-cols-[340px_minmax(0,1fr)]">
      <aside className="z-[1000] h-full border-r border-border/70 bg-background/95 backdrop-blur-md">
        <div className="flex h-full flex-col p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">
              {isDetailOpen ? "Selected WG" : "Nearby WGs"}
            </h2>
            {isDetailOpen && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-[11px] font-bold"
                onClick={() => setIsDetailOpen(false)}
              >
                <ChevronLeft className="size-3 mr-1" />
                Back to list
              </Button>
            )}
          </div>

          {!isDetailOpen && (
            <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
              {listings.map((listing) => {
                const isActive = activeListingId === listing.id;
                const score = listing.score ?? 0;
                return (
                  <button
                    key={listing.id}
                    type="button"
                    onClick={() => {
                      setActiveListingId(listing.id);
                      setIsDetailOpen(true);
                    }}
                    onMouseEnter={() => setHoveredListingId(listing.id)}
                    onMouseLeave={() => setHoveredListingId(null)}
                    className={cn(
                      "group w-full rounded-xl border p-3 text-left transition-all duration-200",
                      isActive
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border/60 bg-card hover:border-primary/40 hover:shadow-md"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                       <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">{listing.title}</p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground font-medium">
                          {listing.location.neighborhood}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-[11px] font-black">
                          CHF {listing.room.price}
                        </span>
                        {score > 0 && (
                          <div className="flex items-center gap-1">
                            <Sparkles className={cn("size-2.5", score > 80 ? "text-primary" : "text-muted-foreground/50")} />
                            <span className="text-[10px] font-bold text-muted-foreground">{score}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {isDetailOpen && activeListing && (
            <div className="min-h-0 flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
              <Link 
                href={`/app/feed/${activeListing.id}`}
                className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-all hover:border-primary/40 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={activeListing.images.room}
                    alt={activeListing.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  {activeListing.score !== undefined && (
                    <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary/90 px-2 py-1 text-[10px] font-bold text-primary-foreground backdrop-blur-md shadow-lg">
                      <Sparkles className="size-2.5" />
                      {activeListing.score}% Match
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                     <span className="text-[10px] font-bold text-white uppercase tracking-wider">Tap to see full details</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold leading-tight group-hover:text-primary transition-colors">
                      {activeListing.title}
                    </h3>
                  </div>
                  
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <MapPin className="size-3 text-primary/60" />
                    {activeListing.location.neighborhood}, {activeListing.location.city}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-black">CHF {activeListing.room.price}</span>
                      <span className="text-[10px] text-muted-foreground font-medium">/mo</span>
                    </div>
                    <ChevronRight className="size-4 text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
              
              <div className="mt-6 flex flex-col items-center justify-center p-4 text-center rounded-2xl bg-muted/30 border border-dashed border-border/80">
                 <Users className="size-5 text-muted-foreground/40 mb-2" />
                 <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                   Join {activeListing.flatmates.length} people in this <span className="text-foreground font-bold">{activeListing.room.size}m²</span> flat.
                 </p>
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
          <MapMarkerOverlay
            listings={listings}
            listingCoords={listingCoords}
            activeListingId={activeListingId}
            hoveredListingId={hoveredListingId}
            onHover={setHoveredListingId}
            onLeave={(listingId) =>
              setHoveredListingId((current) =>
                current === listingId ? null : current
              )
            }
            onSelect={(listingId) => {
              setActiveListingId(listingId);
              setIsDetailOpen(true);
            }}
          />
        </MapContainer>
      </div>

      <style jsx global>{`
        .leaflet-pane,
        .leaflet-marker-pane {
          z-index: 700;
        }

        .feed-map-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 9999px;
          padding: 6px 12px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.04);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
          position: relative;
          white-space: nowrap;
          border: 1px solid transparent;
        }

        .pill-price {
          font-size: 14px;
          font-weight: 800;
          color: #222;
          letter-spacing: -0.02em;
        }

        .pill-dot {
          position: absolute;
          top: -3px;
          right: -3px;
          width: 8px;
          height: 8px;
          background: hsl(var(--primary));
          border: 2px solid white;
          border-radius: 9999px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }

        .feed-map-pill--hovered {
          transform: scale(1.15);
          box-shadow: 0 8px 24px rgba(0,0,0,0.25);
          z-index: 2000;
        }

        .feed-map-pill--active {
          background: #222;
          transform: scale(1.1);
          z-index: 2001;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }

        .feed-map-pill--active .pill-price {
          color: white;
        }

        .feed-map-pill--active .pill-dot {
          border-color: #222;
        }
      `}</style>
    </section>
  );
}

