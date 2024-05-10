import { RemixModules } from './remix-modules';

export function remixModules(appDirectory: string = "app") {
  return new RemixModules(appDirectory)
}
