import Link from "next/link";

import styles from "./navigation.module.css";

const Navigation = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>TheFirstVideo</a>
      </Link>
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
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
