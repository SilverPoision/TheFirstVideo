import Link from "next/link";

import styles from "./navigation.module.css";
import { useAuth, useSignOut } from "../../contexts/auth";

export default function Navigation() {
  const auth = useAuth();
  const signout = useSignOut();
  let nav = null;
  if (auth.auth) {
    nav = (
      <nav>
        <ul>
          <li>
            <Link href="/subscriptions">Subscriptions</Link>
          </li>
          <li>
            <Link href="/new-videos">New Videos</Link>
          </li>
          <li>
            <Link href="/manage-priority">Manage Priority</Link>
          </li>
          <li>
            <a onClick={signout}>Logout</a>
          </li>
        </ul>
      </nav>
    );
  }
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>TheFirstVideo</a>
      </Link>
      {nav}
    </header>
  );
}
