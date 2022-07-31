import React from "react";
import { LinkIcon } from "@heroicons/react/outline";
import { Link } from "@components/Link";
import styles from "./style.module.css";

export default function Footer() {
  return (
    <footer className={styles["footer"]}>
      <Link
        icon={<LinkIcon />}
        href="https://github.com/azuwey/friendly-lamp/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Github
      </Link>
    </footer>
  );
}
