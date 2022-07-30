import React, { useEffect, useState } from "react";
import { PhotographIcon, SparklesIcon } from "@heroicons/react/outline";
import Button from "@components/Button";
import { usePhantomWallet } from "@contexts/phantomWallet";
import styles from "./style.module.css";

export default function App() {
  const { publicKeyString, isConnected, detectProvider, tryConnectWallet, tryDisconnectWallet } =
    usePhantomWallet();
  const [isPhantomWalletInstalled, setIsPhantomWalletInstalled] = useState(false);

  useEffect(() => {
    const error = detectProvider();
    if (error === null) {
      setIsPhantomWalletInstalled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles["top-container"]}>
        <SparklesIcon className={styles["title-icon"]} />
        <h1 className={styles["title"]}>Friendly Lamp</h1>
      </div>
      <div className={styles["middle-container"]}>
        <h1 className={styles["sub-title"]}>View your GIF collection in the metaverse</h1>
        <PhotographIcon className={styles["sub-title-icon"]} />
      </div>
      <div className={styles["bottom-container"]}>
        {!isPhantomWalletInstalled && <span>Install phantom wallet</span>}
        {isPhantomWalletInstalled && !isConnected && (
          <Button onClick={tryConnectWallet}>Connect to Phantom Wallet</Button>
        )}
        {isPhantomWalletInstalled && isConnected && (
          <>
            <span>{`Public Key: ${publicKeyString}`}</span>
            <Button onClick={tryDisconnectWallet}>Disconnect Phantom Wallet</Button>
          </>
        )}
      </div>
    </>
  );
}
