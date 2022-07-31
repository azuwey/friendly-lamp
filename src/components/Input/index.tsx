import React, { InputHTMLAttributes } from "react";
import styles from "./style.module.css";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "className">;

export default function Input(props: Props) {
  return <input className={styles["input"]} {...props} />;
}
