import { getVibeLabel } from "@/lib/mvp-data";

export function VibeTag({
  vibeId,
  highlight = false,
}: {
  vibeId: string;
  highlight?: boolean;
}) {
  const vibe = getVibeLabel(vibeId);
  if (!vibe) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
        highlight
          ? "bg-primary/10 text-primary"
          : "bg-muted text-muted-foreground"
      }`}
    >
      <span>{vibe.emoji}</span>
      {vibe.label}
    </span>
  );
}
