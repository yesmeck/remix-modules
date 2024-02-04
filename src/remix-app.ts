import type { RouteManifest } from '@remix-run/dev/dist/config/routes';
import { existsSync } from 'fs';
import { join, relative, resolve } from 'path';

let flatRoutes: typeof import('@remix-run/dev/dist/config/flat-routes').flatRoutes;

try {
  flatRoutes = require('@remix-run/dev/dist/config/flat-routes').flatRoutes;
} catch (e) {
  flatRoutes = require('@vercel/remix-run-dev/dist/config/flat-routes').flatRoutes;
}

const entryExts = [".js", ".jsx", ".ts", ".tsx"];

function findEntry(dir: string, basename: string): string | undefined {
  for (let ext of entryExts) {
    let file = resolve(dir, basename + ext);
    if (existsSync(file)) return relative(dir, file);
  }

  return undefined;
}

export type Options = {
  at: string;
  layout?: string;
}

export class RemixApp {
  constructor(private path: string, private options: Options) { }

  async routes() {
    const toPath = this.options.at.replace(/^\//, "");
    const moduleDir = resolve(process.cwd(), 'app', this.path);
    const rootRouteFile = findEntry(moduleDir, 'root');

    if (!existsSync(resolve(moduleDir, 'routes'))) {
      return;
    }

    const routes: RouteManifest = {};

    const rootRouteId = `${module}/root`;

    const layout = this.options.layout ?? 'root';

    if (rootRouteFile) {
      routes[rootRouteId] = {
        path: toPath,
        id: rootRouteId,
        file: join(this.path, rootRouteFile),
        parentId: layout,
      };
    }

    const fileRoutes = await flatRoutes(moduleDir);

    for (let route of Object.values(fileRoutes)) {
      const id = `${module}/${route.id}`;

      route.id = id;
      route.file = join(this.path, route.file);
      route.parentId =
        route.parentId === 'root' ?
          rootRouteFile ?
            rootRouteId : layout
          : `${module}/${route.parentId}`;

      routes[route.id] = { ...route, parentId: route.parentId };
    }

    return routes;
  }
}
