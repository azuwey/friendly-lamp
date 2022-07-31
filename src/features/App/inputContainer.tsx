import React, { useState } from "react";
import Input from "@components/Input";
import Button from "@components/Button";
import { useImageList } from "@contexts/imageList";
import styles from "./style.module.css";

export default function InputContainer() {
  const [_, setImageList] = useImageList();
  const [imageURL, setImageURL] = useState("");

  const addImageUrlToImageList = () => {
    setImageList((prevList) => {
      let newImageList = prevList.slice();
      newImageList = newImageList.concat(imageURL);
      return newImageList;
    });
    setImageURL("");
  };

  return (
    <div className={styles["input-container"]}>
      <Input
        type="url"
        placeholder="https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
      />
      <Button onClick={addImageUrlToImageList}>Add</Button>
    </div>
  );
}
