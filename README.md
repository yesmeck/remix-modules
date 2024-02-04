# Remix Modules

Scale your remix app with modules.

> [!WARNING]
> This is a experimental package and is not ready for production use.

## What is a module?

A module is a remix app that can be mounted into another remix app.

```bash
.
├── modules
│   └── blog <=== this is a module
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
const { remixModules } = require('remix-modules');

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  routes: async () => {
    const modules = remixModules();
    await modules.mount('modules/blog', {
      at: '/blog', // mount the blog module to /blog
      layout: 'routes/_app' // use _app as layout
    });
    return modules.routes();
  }
};
```

## License

[MIT](./LICENSE)
