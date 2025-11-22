import { RouteConfig, RouterConfig } from "./hash-router";

export interface SiteRouterConfig {
  routes: RouteConfig[];
  pages: Record<string, (match: RegExpMatchArray) => PageEntry>;
}

export interface PageEntry extends RouterConfig {}
export type EnvKind = `${"ses" | "raw"}-${"amd" | "es"}`;
export class SiteRouter {
  static get envKind(): EnvKind {
    return SiteRouter.#envKind;
  }
  static #envKind: EnvKind = `${"harden" in globalThis ? "ses" : "raw"}-${
    "define" in globalThis ? "amd" : "es"
  }`;
  readonly #cfg: SiteRouterConfig;
  constructor(cfg: SiteRouterConfig) {
    this.#cfg = cfg;
  }
}
