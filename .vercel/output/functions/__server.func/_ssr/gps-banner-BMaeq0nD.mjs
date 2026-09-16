import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as formatAccuracy } from "./utils-C8V_sHGQ.mjs";
import { h as LoaderCircle, m as LocateFixed, p as LocateOff } from "../_libs/lucide-react.mjs";
import { n as Button, v as reverseGeocode } from "./use-snapshot-CdaxUw3i.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gps-banner-BMaeq0nD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GpsBanner({ gps, onRetry }) {
	const [place, setPlace] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (gps.status !== "ready") return;
		let cancelled = false;
		reverseGeocode({ data: {
			lat: gps.lat,
			lng: gps.lng
		} }).then((r) => {
			if (!cancelled) setPlace(r.label);
		});
		return () => {
			cancelled = true;
		};
	}, [gps]);
	if (gps.status === "ready") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 rounded-xl bg-ok-fg px-3 py-2 text-ok",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocateFixed, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-sm font-semibold leading-tight",
				children: place || "Localização ativa"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[11px] tabular-nums opacity-80",
				children: [
					gps.lat.toFixed(5),
					", ",
					gps.lng.toFixed(5),
					" · ±",
					formatAccuracy(gps.accuracy)
				]
			})]
		})]
	});
	if (gps.status === "requesting" || gps.status === "idle") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 shrink-0 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm",
			children: "Ativando GPS…"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocateOff, { className: "size-4 shrink-0 text-danger" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "min-w-0 flex-1 text-sm text-muted",
				children: gps.message ?? "GPS desligado. Toque para ativar."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "outline",
				onClick: onRetry ?? gps.retry,
				children: "Ativar"
			})
		]
	});
}
//#endregion
export { GpsBanner as t };
