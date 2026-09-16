import { useCallback, useEffect, useState } from "react";
import type { GpsState, Street } from "./types";

export const DEFAULT_CENTER = { lat: -22.8711, lng: -43.7752 };

export function haversineMeters(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371000;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

export function projectMercator(lat: number, lng: number, zoom: number) {
  const n = 2 ** zoom;
  const x = ((lng + 180) / 360) * n;
  const latRad = (lat * Math.PI) / 180;
  const y =
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n;
  return { x, y };
}

export function matchStreetByLabel(label: string, streets: Street[], workId: string): Street | undefined {
  const hay = label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const list = streets.filter((s) => s.active && (!workId || s.workId === workId));
  const norm = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/^(rua|av\.?|avenida|travessa|tv\.?)\s+/i, "");
  return (
    list.find((s) => hay.includes(norm(s.name))) ??
    list.find((s) => {
      const n = norm(s.name);
      return n.split(/\s+/).some((w) => w.length > 4 && hay.includes(w));
    })
  );
}

export function useGps(): GpsState & { retry: () => void } {
  const [state, setState] = useState<GpsState>({ status: "idle" });
  const [tick, setTick] = useState(0);

  const retry = useCallback(() => {
    setState({ status: "requesting" });
    setTick((n) => n + 1);
  }, []);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setState({ status: "unsupported", message: "Este aparelho não tem GPS." });
      return;
    }
    setState({ status: "requesting" });
    const watch = navigator.geolocation.watchPosition(
      (p) => {
        setState({
          status: "ready",
          lat: p.coords.latitude,
          lng: p.coords.longitude,
          accuracy: p.coords.accuracy,
        });
      },
      (err) => {
        const denied = err.code === err.PERMISSION_DENIED;
        setState({
          status: denied ? "denied" : "error",
          message: denied
            ? "Permita o acesso à localização para a equipe ver onde você está."
            : err.message || "Não foi possível ler o GPS.",
        });
      },
      { enableHighAccuracy: true, maximumAge: 4000, timeout: 18000 },
    );
    return () => navigator.geolocation.clearWatch(watch);
  }, [tick]);

  return { ...state, retry };
}

const DEVICE_KEY = "apontador-device-id";
const LABEL_KEY = "apontador-crew-label";
const LAST_KEY = "apontador-last";

export function getDeviceId(): string {
  if (typeof localStorage === "undefined") return "preview";
  let id = localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DEVICE_KEY, id);
  }
  return id;
}

export function getCrewLabel(): string {
  if (typeof localStorage === "undefined") return "";
  return localStorage.getItem(LABEL_KEY) ?? "";
}

export function setCrewLabel(label: string) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(LABEL_KEY, label.trim().slice(0, 24));
}

export function loadLast(): {
  workId: string;
  streetId: string;
  equipmentId: string;
  activityId: string;
} {
  const fallback = {
    workId: "l449",
    streetId: "visconde",
    equipmentId: "lok-453",
    activityId: "exec-caixa-ralo",
  };
  if (typeof localStorage === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(LAST_KEY);
    if (raw) return JSON.parse(raw) as ReturnType<typeof loadLast>;
  } catch {
    /* ignore */
  }
  return fallback;
}

export function saveLast(last: {
  workId: string;
  streetId: string;
  equipmentId: string;
  activityId: string;
}) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(LAST_KEY, JSON.stringify(last));
}
