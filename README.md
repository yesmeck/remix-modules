# Remix Modules

Scale your remix app with modules.

> [!WARNING]
> This is a experimental package, use at your own risk.

## What is a module?

A module is a remix app that can be mounted into another remix app.

```bash
.
├── modules
│   └── order <=== this is a module
│       ├── routes
│       └── root.tsx
├── routes
└── root.tsx
```

## Installation

```bash
npm install remix-modules
```

## Configuration

Update your remix.config.js file and use the custom routes config option.

```js
import { defineConfig } from 'vite';
import { vitePlugin as remix } from '@remix-run/dev';
import { remixModules } from 'remix-modules';

export default defineConfig(() => {
  return {
    plugins: [remix(
      routes: async () => {
        const modules = remixModules();
        await modules.mount('modules/order', {
          at: '/orders', // mount the order module at /orders
          layout: 'routes/_admin' // use _admin as layout
        });
        return modules.routes();
      }
    )]
  }
});
```

See the [example](./example) for a more detailed example.

## License

[MIT](./LICENSE)
