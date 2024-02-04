import { Outlet } from '@remix-run/react';

export default function Component() {
  return (
    <div>
      <h1>Order Root</h1>
      <Outlet />
    </div>
  )
}
