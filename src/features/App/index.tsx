import React from "react";
import { usePhantomWallet } from "@contexts/phantomWallet";
import { ImageGrid } from "@features/ImageGrid";
import Header from "./header";
import InputContainer from "./inputContainer";
import Footer from "./footer";
import styles from "./style.module.css";

export default function App() {
  const { isConnected, isInstalled } = usePhantomWallet();

  return (
    <main className={styles["layout"]}>
      <Header />
      {isInstalled && isConnected && <InputContainer />}
      <div className={styles["image-grid-container"]}>
        {isInstalled && isConnected && <ImageGrid />}
      </div>
      <Footer />
    </main>
  );
}
