import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  closeApontamento,
  deleteApontamento,
  getSnapshot,
  pingPresence,
  upsertApontamento,
  type SavePayload,
} from "./api";
import { getCrewLabel, getDeviceId } from "./geo";
import type { GpsState, LastUsed, Snapshot } from "./types";

export const SNAPSHOT_KEY = ["snapshot"] as const;

export function useSnapshot(initial?: Snapshot) {
  return useQuery({
    queryKey: SNAPSHOT_KEY,
    queryFn: () => getSnapshot(),
    refetchInterval: 4000,
    initialData: initial,
  });
}

export function useSnapshotData(): Snapshot | undefined {
  return useSnapshot().data;
}

export function useInvalidateSnapshot() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: SNAPSHOT_KEY });
}

export function useUpsertApontamento() {
  const invalidate = useInvalidateSnapshot();
  return useMutation({
    mutationFn: (data: SavePayload) => upsertApontamento({ data }),
    onSuccess: () => void invalidate(),
  });
}

export function useCloseApontamento() {
  const invalidate = useInvalidateSnapshot();
  return useMutation({
    mutationFn: (data: { id: string; end: string }) => closeApontamento({ data }),
    onSuccess: () => void invalidate(),
  });
}

export function useDeleteApontamento() {
  const invalidate = useInvalidateSnapshot();
  return useMutation({
    mutationFn: (id: string) => deleteApontamento({ data: { id } }),
    onSuccess: () => void invalidate(),
  });
}

export function usePresencePing(gps: GpsState, last: LastUsed) {
  const lat = gps.status === "ready" ? gps.lat : null;
  const lng = gps.status === "ready" ? gps.lng : null;
  const acc = gps.status === "ready" ? gps.accuracy : null;
  useEffect(() => {
    if (lat == null || lng == null) return;
    const send = () => {
      void pingPresence({
        data: {
          deviceId: getDeviceId(),
          label: getCrewLabel() || "No campo",
          lat,
          lng,
          accuracy: acc,
          workId: last.workId || null,
          equipmentId: last.equipmentId || null,
          streetId: last.streetId || null,
        },
      });
    };
    send();
    const id = window.setInterval(send, 12000);
    return () => window.clearInterval(id);
  }, [lat, lng, acc, last.workId, last.equipmentId, last.streetId]);
}
