import { Outlet } from '@remix-run/react';

export default function Component() {
  return (
    <div>
      <header>
        <h1>Admin</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
