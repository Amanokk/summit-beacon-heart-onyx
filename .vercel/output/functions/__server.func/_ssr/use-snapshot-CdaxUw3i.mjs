import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { f as useRouterState, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C8V_sHGQ.mjs";
import { a as number, n as array, o as object, r as boolean, s as string, t as _enum } from "../_libs/zod.mjs";
import { C as CalendarDays, a as Settings2, b as ClipboardList, d as MapPinned, l as Plus } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-snapshot-CdaxUw3i.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/",
		label: "Hoje",
		icon: CalendarDays
	},
	{
		to: "/novo",
		label: "Novo",
		icon: Plus
	},
	{
		to: "/mapa",
		label: "Mapa",
		icon: MapPinned
	},
	{
		to: "/historico",
		label: "Histórico",
		icon: ClipboardList
	},
	{
		to: "/cadastros",
		label: "Cadastros",
		icon: Settings2
	}
];
function AppShell({ children, hideNav }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh max-w-lg flex-col bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("flex min-h-0 flex-1 flex-col", hideNav ? "pb-0" : "pb-20"),
			children
		}), hideNav ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "no-print fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-lg grid-cols-5 px-1 pb-[env(safe-area-inset-bottom)] pt-1",
				children: NAV.map((item) => {
					const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-md text-[11px] font-medium transition-colors duration-150", active ? "text-primary" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-5",
							strokeWidth: active ? 2.4 : 1.8
						}), item.label]
					}, item.to);
				})
			})
		})]
	});
}
function ScreenLoader() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col gap-3 bg-bg px-4 pt-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-40 animate-pulse rounded-md bg-surface-2" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-16 animate-pulse rounded-xl bg-surface-2" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-44 animate-pulse rounded-xl bg-surface-2" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 animate-pulse rounded-xl bg-surface-2" })
		]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[background-color,color,box-shadow,transform,opacity] duration-150 ease-out disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg hover:bg-primary/90",
			secondary: "bg-surface-2 text-fg hover:bg-border",
			outline: "border border-border bg-surface text-fg hover:bg-surface-2",
			ghost: "text-fg hover:bg-surface-2",
			danger: "bg-danger text-primary-fg hover:bg-danger/90"
		},
		size: {
			default: "h-12 rounded-md px-4 text-base",
			sm: "h-9 rounded-sm px-3 text-sm",
			lg: "h-14 rounded-lg px-5 text-lg",
			icon: "size-12 rounded-md"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-12 w-full rounded-md border border-border bg-surface px-3 text-base text-fg placeholder:text-subtle", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-20 w-full rounded-md border border-border bg-surface px-3 py-2 text-base text-fg placeholder:text-subtle", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("mb-1.5 block text-sm font-medium text-muted", className),
		...props
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getSnapshot = createServerFn({ method: "GET" }).handler(createSsrRpc("8d42ed533f9e880af7d4b9c7f833591bfa25f76948cdffd848723661f020b3dc"));
var saveSchema = object({
	id: string().min(1),
	date: string().min(8),
	start: string().min(4),
	end: string().nullable(),
	workId: string(),
	streetId: string(),
	equipmentId: string(),
	activityId: string(),
	estaca: string(),
	pv: string(),
	quantity: number().nullable(),
	notes: string(),
	lat: number().nullable(),
	lng: number().nullable(),
	accuracy: number().nullable(),
	locationLabel: string(),
	deviceId: string()
});
var upsertApontamento = createServerFn({ method: "POST" }).validator(saveSchema).handler(createSsrRpc("ce847625bb57870d3161edb5b1541a32a2202cd294a7b5430ce2b1fde6de1c25"));
var closeApontamento = createServerFn({ method: "POST" }).validator(object({
	id: string(),
	end: string()
})).handler(createSsrRpc("5c192a039b56d8e46a700abb17a5ffee18cbbf2d67bd0f12298a306bdd13d0e7"));
var deleteApontamento = createServerFn({ method: "POST" }).validator(object({ id: string() })).handler(createSsrRpc("c0663af8e30866edb8347b722afe0e997ea4d393f77a8ef50929d7c835316f64"));
var presenceSchema = object({
	deviceId: string().min(1),
	label: string(),
	lat: number(),
	lng: number(),
	accuracy: number().nullable(),
	workId: string().nullable(),
	equipmentId: string().nullable(),
	streetId: string().nullable()
});
var pingPresence = createServerFn({ method: "POST" }).validator(presenceSchema).handler(createSsrRpc("eef9a9df9c5ee2b86cde8892389b36bf627bdf3a94ed759df0f5daccf6550719"));
var reverseGeocode = createServerFn({ method: "POST" }).validator(object({
	lat: number(),
	lng: number()
})).handler(createSsrRpc("9adbf68a15d15b1c3afe18f38f6440b0816972ca3405db633a16ff37230a28af"));
var addWork = createServerFn({ method: "POST" }).validator(object({
	code: string().min(1),
	name: string().min(1)
})).handler(createSsrRpc("bcb49d7dde462ae0dc5126adee0ca7fccca81b652363a307d1137dada119b28a"));
var addStreet = createServerFn({ method: "POST" }).validator(object({
	name: string().min(1),
	workId: string()
})).handler(createSsrRpc("9cff1b772483fd6081dbf3a0cabbcfdfb0caa742731a4ba634c078ffca059d09"));
var addEquipment = createServerFn({ method: "POST" }).validator(object({
	name: string().min(1),
	code: string().min(1),
	kind: _enum([
		"retro",
		"rolo",
		"basculante",
		"pipa",
		"van",
		"truck"
	]),
	activityIds: array(string())
})).handler(createSsrRpc("248ee50e388b9300d95f63360cb601a04b13b11dedadbe2c9f883c8601c0a51d"));
var updateEquipment = createServerFn({ method: "POST" }).validator(object({
	id: string(),
	name: string().optional(),
	code: string().optional(),
	kind: _enum([
		"retro",
		"rolo",
		"basculante",
		"pipa",
		"van",
		"truck"
	]).optional(),
	activityIds: array(string()).optional(),
	active: boolean().optional()
})).handler(createSsrRpc("3d1c7dda79a7fdc17ceaf7ce20ff72734e2352e3f10bb2afdbfade1555773006"));
var toggleStreet = createServerFn({ method: "POST" }).validator(object({ id: string() })).handler(createSsrRpc("1a2e2f9a5e6c0cc2b16ff18ef04730889735175557329211235f34cd2ae03aab"));
var addActivity = createServerFn({ method: "POST" }).validator(object({
	name: string().min(1),
	equipmentId: string().optional()
})).handler(createSsrRpc("572516a8071f85131a32827d9675f8cfa4007eecf89ca944dfe1c2fd25c2a9e9"));
var DEFAULT_CENTER = {
	lat: -22.8711,
	lng: -43.7752
};
function haversineMeters(a, b) {
	const R = 6371e3;
	const dLat = (b.lat - a.lat) * Math.PI / 180;
	const dLng = (b.lng - a.lng) * Math.PI / 180;
	const la1 = a.lat * Math.PI / 180;
	const la2 = b.lat * Math.PI / 180;
	const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
	return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}
function projectMercator(lat, lng, zoom) {
	const n = 2 ** zoom;
	const x = (lng + 180) / 360 * n;
	const latRad = lat * Math.PI / 180;
	return {
		x,
		y: (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n
	};
}
function matchStreetByLabel(label, streets, workId) {
	const hay = label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	const list = streets.filter((s) => s.active && (!workId || s.workId === workId));
	const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/^(rua|av\.?|avenida|travessa|tv\.?)\s+/i, "");
	return list.find((s) => hay.includes(norm(s.name))) ?? list.find((s) => {
		return norm(s.name).split(/\s+/).some((w) => w.length > 4 && hay.includes(w));
	});
}
function useGps() {
	const [state, setState] = (0, import_react.useState)({ status: "idle" });
	const [tick, setTick] = (0, import_react.useState)(0);
	const retry = (0, import_react.useCallback)(() => {
		setState({ status: "requesting" });
		setTick((n) => n + 1);
	}, []);
	(0, import_react.useEffect)(() => {
		if (typeof navigator === "undefined" || !navigator.geolocation) {
			setState({
				status: "unsupported",
				message: "Este aparelho não tem GPS."
			});
			return;
		}
		setState({ status: "requesting" });
		const watch = navigator.geolocation.watchPosition((p) => {
			setState({
				status: "ready",
				lat: p.coords.latitude,
				lng: p.coords.longitude,
				accuracy: p.coords.accuracy
			});
		}, (err) => {
			const denied = err.code === err.PERMISSION_DENIED;
			setState({
				status: denied ? "denied" : "error",
				message: denied ? "Permita o acesso à localização para a equipe ver onde você está." : err.message || "Não foi possível ler o GPS."
			});
		}, {
			enableHighAccuracy: true,
			maximumAge: 4e3,
			timeout: 18e3
		});
		return () => navigator.geolocation.clearWatch(watch);
	}, [tick]);
	return {
		...state,
		retry
	};
}
var DEVICE_KEY = "apontador-device-id";
var LABEL_KEY = "apontador-crew-label";
var LAST_KEY = "apontador-last";
function getDeviceId() {
	if (typeof localStorage === "undefined") return "preview";
	let id = localStorage.getItem(DEVICE_KEY);
	if (!id) {
		id = crypto.randomUUID();
		localStorage.setItem(DEVICE_KEY, id);
	}
	return id;
}
function getCrewLabel() {
	if (typeof localStorage === "undefined") return "";
	return localStorage.getItem(LABEL_KEY) ?? "";
}
function setCrewLabel(label) {
	if (typeof localStorage === "undefined") return;
	localStorage.setItem(LABEL_KEY, label.trim().slice(0, 24));
}
function loadLast() {
	const fallback = {
		workId: "l449",
		streetId: "visconde",
		equipmentId: "lok-453",
		activityId: "exec-caixa-ralo"
	};
	if (typeof localStorage === "undefined") return fallback;
	try {
		const raw = localStorage.getItem(LAST_KEY);
		if (raw) return JSON.parse(raw);
	} catch {}
	return fallback;
}
function saveLast(last) {
	if (typeof localStorage === "undefined") return;
	localStorage.setItem(LAST_KEY, JSON.stringify(last));
}
var SNAPSHOT_KEY = ["snapshot"];
function useSnapshot() {
	return useQuery({
		queryKey: SNAPSHOT_KEY,
		queryFn: () => getSnapshot(),
		refetchInterval: 4e3
	});
}
function useInvalidateSnapshot() {
	const qc = useQueryClient();
	return () => qc.invalidateQueries({ queryKey: SNAPSHOT_KEY });
}
function useUpsertApontamento() {
	const invalidate = useInvalidateSnapshot();
	return useMutation({
		mutationFn: (data) => upsertApontamento({ data }),
		onSuccess: () => void invalidate()
	});
}
function useCloseApontamento() {
	const invalidate = useInvalidateSnapshot();
	return useMutation({
		mutationFn: (data) => closeApontamento({ data }),
		onSuccess: () => void invalidate()
	});
}
function useDeleteApontamento() {
	const invalidate = useInvalidateSnapshot();
	return useMutation({
		mutationFn: (id) => deleteApontamento({ data: { id } }),
		onSuccess: () => void invalidate()
	});
}
function usePresencePing(gps, last) {
	const lat = gps.status === "ready" ? gps.lat : null;
	const lng = gps.status === "ready" ? gps.lng : null;
	const acc = gps.status === "ready" ? gps.accuracy : null;
	(0, import_react.useEffect)(() => {
		if (lat == null || lng == null) return;
		const send = () => {
			pingPresence({ data: {
				deviceId: getDeviceId(),
				label: getCrewLabel() || "No campo",
				lat,
				lng,
				accuracy: acc,
				workId: last.workId || null,
				equipmentId: last.equipmentId || null,
				streetId: last.streetId || null
			} });
		};
		send();
		const id = window.setInterval(send, 12e3);
		return () => window.clearInterval(id);
	}, [
		lat,
		lng,
		acc,
		last.workId,
		last.equipmentId,
		last.streetId
	]);
}
//#endregion
export { useCloseApontamento as C, usePresencePing as D, useInvalidateSnapshot as E, useSnapshot as O, updateEquipment as S, useGps as T, projectMercator as _, Label as a, setCrewLabel as b, addActivity as c, addWork as d, getCrewLabel as f, matchStreetByLabel as g, loadLast as h, Input as i, useUpsertApontamento as k, addEquipment as l, haversineMeters as m, Button as n, ScreenLoader as o, getDeviceId as p, DEFAULT_CENTER as r, Textarea as s, AppShell as t, addStreet as u, reverseGeocode as v, useDeleteApontamento as w, toggleStreet as x, saveLast as y };
