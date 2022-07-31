import React from "react";
import hashCode from "@utils/hash";
import styles from "./style.module.css";
import { useImageList } from "@contexts/imageList";

export function ImageGrid() {
  const [imageList] = useImageList();

  return (
    <div className={styles["image-grid"]}>
      {imageList.map((image, index) => (
        <img
          key={`${hashCode(image)}_${index}`}
          className={styles["image"]}
          src={image}
          alt={image}
        />
      ))}
    </div>
  );
}
