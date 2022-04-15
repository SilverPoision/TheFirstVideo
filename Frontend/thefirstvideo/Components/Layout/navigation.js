import Link from "next/link";
import { useEffect } from "react";
import Router from "next/router";

import styles from "./navigation.module.css";
import { useAuth, useSignOut, useAuthUpdate } from "../../contexts/auth";

export default function Navigation() {
  const auth = useAuth();
  const signout = useSignOut();
  const updateAuth = useAuthUpdate();

  useEffect(() => {
    updateAuth();
    if (!auth.auth) {
      if (Router.asPath != "/") {
        Router.push("/");
      }
    }
  }, []);

  let nav = null;
  if (auth.auth) {
    nav = (
      <>
        <li>
          <Link href="/subscription">Subscriptions</Link>
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
      </>
    );
  }

  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <li>
            <Link href="/">TheFirstVideo</Link>
          </li>
          {nav}
        </ul>
      </nav>
    </header>
  );
}
