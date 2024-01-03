import { RouteManifest } from '@remix-run/dev/dist/config/routes';
import { existsSync } from 'fs';
import { resolve, relative, join } from 'path';


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


export class RemixModules {
  #routes: RouteManifest = {};

  async mount(module: string, path: string) {
    const moduleDir = resolve(process.cwd(), 'app', module);
    const rootRouteFile = findEntry(moduleDir, 'root');

    if (!existsSync(resolve(moduleDir, 'routes'))) {
      return;
    }

    const routes: RouteManifest = {};

    const rootRouteId = `${module}/root`;

    if (rootRouteFile) {
      routes[rootRouteId] = {
        path,
        id: rootRouteId,
        file: join(module, rootRouteFile),
        parentId: 'root'
      };
    }

    const fileRoutes = await flatRoutes(moduleDir);

    for (let route of Object.values(fileRoutes)) {
      const id = `${module}/${route.id}`;

      route.id = id;
      route.file = join(module, route.file);
      route.path = join(path, route.path ?? "");
      route.parentId =
        route.parentId === 'root' ?
          rootRouteFile ?
            rootRouteId : 'root'
          : `${module}/${route.parentId}`;

      routes[route.id] = { ...route, parentId: route.parentId };
    }

    this.#routes = {
      ...this.#routes,
      ...routes
    };
  }

  routes() {
    return this.#routes;
  }
}
