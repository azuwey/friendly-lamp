import React, { AnchorHTMLAttributes } from "react";
import styles from "./style.module.css";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
  icon: React.ReactNode;
};

export function Link({ children, icon, ...props }: Props) {
  return (
    <a className={styles["link"]} {...props}>
      <span className={styles["icon"]}>{icon}</span>
      <span className={styles["text"]}>{children}</span>
    </a>
  );
}
