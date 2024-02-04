import { Link } from '@remix-run/react';

export default function Component() {
  return (
    <ul>
      <li>
        <Link to="/orders/1">Order #1</Link>
      </li>
      <li>
        <Link to="/orders/2">Order #2</Link>
      </li>
      <li>
        <Link to="/orders/3">Order #3</Link>
      </li>
    </ul>
  )
}
