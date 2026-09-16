import { LocateFixed, LocateOff, LoaderCircle } from "lucide-react";
import { reverseGeocode } from "@/lib/api";
import { formatAccuracy } from "@/lib/utils";
import type { GpsState } from "@/lib/types";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export function GpsBanner({
  gps,
  onRetry,
}: {
  gps: GpsState & { retry: () => void };
  onRetry?: () => void;
}) {
  const [place, setPlace] = useState("");

  useEffect(() => {
    if (gps.status !== "ready") return;
    let cancelled = false;
    void reverseGeocode({ data: { lat: gps.lat, lng: gps.lng } }).then((r) => {
      if (!cancelled) setPlace(r.label);
    });
    return () => {
      cancelled = true;
    };
  }, [gps]);

  if (gps.status === "ready") {
    return (
      <div className="flex items-center gap-2 rounded-xl bg-ok-fg px-3 py-2 text-ok">
        <LocateFixed className="size-4 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold leading-tight">
            {place || "Localização ativa"}
          </p>
          <p className="text-[11px] tabular-nums opacity-80">
            {gps.lat.toFixed(5)}, {gps.lng.toFixed(5)} · ±{formatAccuracy(gps.accuracy)}
          </p>
        </div>
      </div>
    );
  }

  if (gps.status === "requesting" || gps.status === "idle") {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-muted">
        <LoaderCircle className="size-4 shrink-0 animate-spin" />
        <p className="text-sm">Ativando GPS…</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2">
      <LocateOff className="size-4 shrink-0 text-danger" />
      <p className="min-w-0 flex-1 text-sm text-muted">
        {gps.message ?? "GPS desligado. Toque para ativar."}
      </p>
      <Button size="sm" variant="outline" onClick={onRetry ?? gps.retry}>
        Ativar
      </Button>
    </div>
  );
}
