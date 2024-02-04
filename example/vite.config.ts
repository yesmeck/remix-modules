import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { remixModules } from 'remix-modules';
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      routes: async () => {
        const modules = remixModules();
        modules.mount('modules/order', {
          at: '/order',
          layout: 'routes/_admin'
        });
        return modules.routes();
      }
    }),
    tsconfigPaths()
  ],
});
