import urlJoin from 'url-join';
import { match } from 'path-to-regexp';

export type Render = ((outlet: HTMLElement, params: Record<string, string>) => void);

export interface RouteConfig {
  path: string;
  render: Render;
}

export type RouteConfigs = Array<RouteConfig>;

export interface BrowserRouterOptions {
  base: string;
  routes: RouteConfigs;
  outlet: HTMLElement;
}

export class BrowserRouter {
  private routeConfigs: RouteConfigs;

  private get base() {
    return this.options.base;
  }
  private get outlet() {
    return this.options.outlet;
  }

  constructor(
      private readonly options: BrowserRouterOptions) {
    this.routeConfigs = this.options.routes.map(route => {
      return {
        ...route,
        path: urlJoin(this.base, route.path),
      };
    });

    this.renderRoute(window.location.pathname);

    window.addEventListener('popstate', () => {
      this.renderRoute(window.location.pathname);
    });
  }

  public navigate(link: string) {
    let url: string;
    if (link.startsWith('/')) {
      url = urlJoin(this.options.base, link)
    } else {
      url = urlJoin(window.location.pathname, link)
    }
    window.history.pushState({}, '', url);

    this.renderRoute(url);
  }

  private renderRoute(url: string) {
    const matchedRoute = this.matchRoute(url);
    if (matchedRoute) {
      const { route, result } = matchedRoute;
      route.render(this.outlet, result.params);
    } else {
      throw new Error(`no route match path ${ url }`);
    }
  }

  private matchRoute(url: string) {
    for (const route of this.routeConfigs) {
      const matcher = match<any>(route.path);
      const result = matcher(url);
      if (result) {
        return {
          route,
          result,
        };
      }
    }
    return null;
  }

}
