import React, { ButtonHTMLAttributes } from "react";
import styles from "./style.module.css";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export default function Button({ children, ...props }: Props) {
  return (
    <button className={styles["button"]} {...props}>
      {children}
    </button>
  );
}
