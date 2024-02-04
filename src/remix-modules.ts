import { Options, RemixApp } from './remix-app';

export class RemixModules {
  #apps: RemixApp[] = [];

  mount(path: string, option: Options) {
    const app = new RemixApp(path, option);
    this.#apps.push(app);
  }

  async routes() {
    return this.#apps.reduce(async (routes, app) => {
      const appRoutes = await app.routes();
      return { ...routes, ...appRoutes };
    }, {});
  }
}
