
/**
 * Hash-based routing module
 * Separates hash pattern matching from page actions
 */

export interface SubpageActions {
  enable: (match: RegExpMatchArray) => void;
  disable: () => void;
}

export interface RouteConfig {
  pattern: RegExp;
  subpage: string;
}

export interface RouterConfig {
  routes: RouteConfig[];
  subpages: Record<string, SubpageActions>;
  defaultSubpage?: string;
}

/**
 * Creates a hash router that manages subpage visibility based on URL hash patterns
 * @param config Router configuration with routes, subpages, and optional default
 * @returns A function that handles hash changes
 */
export function createHashRouter(config: RouterConfig): () => void {
  const { routes, subpages, defaultSubpage } = config;

  return function handleHash() {
    const hash = window.location.hash || '';

    // Try to match hash against each route in order
    for (const route of routes) {
      const match = hash.match(route.pattern);
      if (match) {
        // Disable all subpages except the matched one
        for (const [name, actions] of Object.entries(subpages)) {
          if (name === route.subpage) {
            actions.enable(match);
          } else {
            actions.disable();
          }
        }

        return;
      }
    }

    // No route matched - handle default case
    if (defaultSubpage && subpages[defaultSubpage]) {
      // Disable all subpages except default
      for (const [name, actions] of Object.entries(subpages)) {
        if (name === defaultSubpage) {
          actions.enable([hash]);
        } else {
          actions.disable();
        }
      }
    }
  };
}
