import { Options, RemixApp } from './remix-app';

export class RemixModules {
  #apps: RemixApp[] = [];

  constructor(private appDirectory: string) {}

  mount(path: string, option: Options) {
    const app = new RemixApp(this.appDirectory, path, option);
    this.#apps.push(app);
  }

  async routes() {
    return this.#apps.reduce(async (routes, app) => {
      const appRoutes = await app.routes();
      return { ...routes, ...appRoutes };
    }, {});
  }
}
