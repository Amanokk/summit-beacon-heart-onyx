import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ApontamentoForm } from "@/components/apontamento-form";
import { AppShell } from "@/components/app-shell";
import { GpsBanner } from "@/components/gps-banner";
import { ScreenLoader } from "@/components/screen-loader";
import { addActivity, getSnapshot, reverseGeocode } from "@/lib/api";
import { draftFromApontamento, emptyDraft } from "@/lib/draft";
import { getDeviceId, loadLast, matchStreetByLabel, saveLast, useGps } from "@/lib/geo";
import { usePresencePing, useSnapshot, useUpsertApontamento, useInvalidateSnapshot } from "@/lib/use-snapshot";
import type { Draft } from "@/lib/types";
import { uid } from "@/lib/utils";

export const Route = createFileRoute("/novo")({
  validateSearch: (raw: Record<string, unknown>): { edit?: string } =>
    typeof raw.edit === "string" && raw.edit ? { edit: raw.edit } : {},
  loader: () => getSnapshot(),
  component: Novo,
});

function Novo() {
  const { edit } = Route.useSearch();
  const navigate = useNavigate();
  const initial = Route.useLoaderData();
  const { data, isLoading } = useSnapshot(initial);
  const gps = useGps();
  const upsert = useUpsertApontamento();
  const invalidate = useInvalidateSnapshot();
  const last = loadLast();
  const existing = edit ? data?.apontamentos.find((a) => a.id === edit) : undefined;
  const [draft, setDraft] = useState<Draft>(() => emptyDraft(last));
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [place, setPlace] = useState("");
  const idRef = useRef(existing?.id ?? uid());
  const timer = useRef<number | null>(null);
  const matchedStreet = useRef(false);
  const dirty = useRef(Boolean(edit));
  const gpsLat = gps.status === "ready" ? gps.lat : null;
  const gpsLng = gps.status === "ready" ? gps.lng : null;

  usePresencePing(gps, {
    workId: draft.workId,
    streetId: draft.streetId,
    equipmentId: draft.equipmentId,
    activityId: draft.activityId,
  });

  useEffect(() => {
    if (existing) {
      setDraft(draftFromApontamento(existing));
      idRef.current = existing.id;
    }
  }, [existing]);

  useEffect(() => {
    if (gpsLat == null || gpsLng == null) return;
    let cancelled = false;
    void reverseGeocode({ data: { lat: gpsLat, lng: gpsLng } }).then((r) => {
      if (cancelled) return;
      setPlace(r.label);
      if (!matchedStreet.current && data?.streets && r.label) {
        const hit = matchStreetByLabel(r.label, data.streets, draft.workId);
        if (hit && hit.id !== draft.streetId) {
          matchedStreet.current = true;
          setDraft((d) => ({ ...d, streetId: hit.id }));
        }
      }
    });
    return () => {
      cancelled = true;
    };
  }, [gpsLat, gpsLng, data?.streets, draft.workId, draft.streetId]);

  const canAuto = Boolean(draft.equipmentId && draft.activityId && draft.streetId && draft.start);

  useEffect(() => {
    if (!canAuto || !dirty.current) return;
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      void persist(false);
    }, 700);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
    // persist reads latest draft/gps via closure on each change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    canAuto,
    draft.date,
    draft.start,
    draft.end,
    draft.ended,
    draft.workId,
    draft.streetId,
    draft.equipmentId,
    draft.activityId,
    draft.estaca,
    draft.pv,
    draft.quantity,
    draft.notes,
    gpsLat,
    gpsLng,
  ]);

  async function persist(done: boolean) {
    if (!draft.equipmentId || !draft.activityId || !draft.streetId) return;
    setSaveState("saving");
    try {
      await upsert.mutateAsync({
        id: idRef.current,
        date: draft.date,
        start: draft.start,
        end: draft.ended && draft.end ? draft.end : null,
        workId: draft.workId,
        streetId: draft.streetId,
        equipmentId: draft.equipmentId,
        activityId: draft.activityId,
        estaca: draft.estaca,
        pv: draft.pv,
        quantity: draft.quantity.trim() === "" ? null : Number(draft.quantity),
        notes: draft.notes,
        lat: gps.status === "ready" ? gps.lat : null,
        lng: gps.status === "ready" ? gps.lng : null,
        accuracy: gps.status === "ready" ? gps.accuracy : null,
        locationLabel: place,
        deviceId: getDeviceId(),
      });
      saveLast({
        workId: draft.workId,
        streetId: draft.streetId,
        equipmentId: draft.equipmentId,
        activityId: draft.activityId,
      });
      setSaveState("saved");
      if (done) {
        toast.success(existing ? "Atualizado para a equipe" : "Salvo para toda a equipe");
        void navigate({ to: "/" });
      }
    } catch {
      setSaveState("error");
    }
  }

  if (isLoading && !data) {
    return (
      <AppShell hideNav>
        <ScreenLoader />
      </AppShell>
    );
  }

  return (
    <AppShell hideNav>
      <header className="flex items-center gap-3 px-3 pb-2 pt-[max(12px,env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={() => void navigate({ to: "/" })}
          className="flex size-12 items-center justify-center rounded-md text-fg"
          aria-label="Voltar"
        >
          <ArrowLeft className="size-5" />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-xl font-semibold">
            {existing ? "Editar apontamento" : "Novo apontamento"}
          </h1>
          <p className="text-xs text-muted">Salva sozinho. A equipe vê na hora.</p>
        </div>
      </header>
      <div className="px-4 pb-2">
        <GpsBanner gps={gps} />
      </div>
      <main className="px-4">
        <ApontamentoForm
          draft={draft}
          onChange={(d) => {
            dirty.current = true;
            setDraft(d);
          }}
          onSubmit={() => void persist(true)}
          submitLabel={existing ? "Concluir alteração" : "Concluir"}
          works={data?.works ?? []}
          streets={data?.streets ?? []}
          equipment={data?.equipment ?? []}
          activities={data?.activities ?? []}
          gps={gps}
          locationLabel={place}
          saveState={saveState}
          onAddActivity={async (name, equipmentId) => {
            const { id } = await addActivity({ data: { name, equipmentId } });
            await invalidate();
            return id;
          }}
        />
      </main>
    </AppShell>
  );
}
