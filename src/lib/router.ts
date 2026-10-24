import { useEffect, useState } from "react";

export type RouteName = "home" | "portfolio" | "services" | "about" | "contact" | "project";

export interface Route {
  name: RouteName;
  param?: string;
  query: Record<string, string>;
  raw: string;
}

function parse(hash: string): Route {
  const clean = hash.replace(/^#\/?/, "");
  const [pathPart, queryPart = ""] = clean.split("?");
  const [segment, param] = pathPart.split("/");
  const query: Record<string, string> = {};
  new URLSearchParams(queryPart).forEach((value, key) => (query[key] = value));

  const name = (["portfolio", "services", "about", "contact", "project"].includes(segment)
    ? segment
    : "home") as RouteName;

  return { name, param, query, raw: hash };
}

export function navigate(to: string) {
  if (window.location.hash === to) {
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    return;
  }
  window.location.hash = to;
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parse(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

/** Scrolls the window to the top whenever the route identity changes. */
export function useScrollReset(deps: unknown[]) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
