import React from "react";
import hashCode from "@utils/hash";
import styles from "./style.module.css";

const TEST_GIFS = [
  "https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp",
  "https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g",
  "https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g",
  "https://media1.giphy.com/media/Az8nDYnqGugrPZLTjx/giphy.gif?cid=ecf05e4715ecfbfa4e160f1401a3f8516cc71a74706ec841&rid=giphy.gif&ct=g",
  "https://media1.giphy.com/media/fipN1GOuDK8txSqay3/giphy.gif",
  "https://media3.giphy.com/media/l3vR1AaADYcE7C8vu/giphy.gif?cid=ecf05e47i7lxw5rkksaohenhd78pso3sd1tm64j20wp03mjg&rid=giphy.gif&ct=g",
  "https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp",
  "https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp",
  "https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp",
  "https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp",
];

export function ImageGrid() {
  return (
    <div className={styles["image-grid"]}>
      {TEST_GIFS.map((gif, index) => (
        <img key={`${hashCode(gif)}_${index}`} className={styles["image"]} src={gif} />
      ))}
    </div>
  );
}
