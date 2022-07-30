import React, { useEffect, useMemo, useState } from "react";
import { ExternalLinkIcon, PhotographIcon, SparklesIcon, LinkIcon } from "@heroicons/react/outline";
import Button from "@components/Button";
import { usePhantomWallet } from "@contexts/phantomWallet";
import styles from "./style.module.css";
import { Link } from "@components/Link";
import { ImageGrid } from "@features/ImageGrid";

export default function App() {
  const { publicKeyString, isConnected, detectProvider, tryConnectWallet, tryDisconnectWallet } =
    usePhantomWallet();
  const [isPhantomWalletInstalled, setIsPhantomWalletInstalled] = useState(false);
  const shortPublicKeyString = useMemo(() => {
    const firstPart = publicKeyString.substring(0, 5);
    const lastPart = publicKeyString.substring(publicKeyString.length - 5);
    return `${firstPart}...${lastPart}`;
  }, [publicKeyString]);

  useEffect(() => {
    const error = detectProvider();
    if (error === null) {
      setIsPhantomWalletInstalled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={styles["layout"]}>
      <div className={styles["header"]}>
        <div className={styles["title-conainer"]}>
          <div className={styles["app-title-container"]}>
            <SparklesIcon className={styles["app-title-icon"]} />
            <h1 className={styles["app-title"]}>Friendly Lamp</h1>
          </div>
          <div className={styles["sub-title-container"]}>
            <h5 className={styles["sub-title"]}>View your GIF collection in the metaverse</h5>
            <PhotographIcon className={styles["sub-title-icon"]} />
          </div>
        </div>
        <div className={styles["wallet-connect-container"]}>
          {isPhantomWalletInstalled && !isConnected && (
            <Button onClick={tryConnectWallet}>Connect to Phantom Wallet</Button>
          )}
          {isPhantomWalletInstalled && isConnected && (
            <Button onClick={tryDisconnectWallet}>{`Disconnect: ${shortPublicKeyString}`}</Button>
          )}
          {!isPhantomWalletInstalled && (
            <Link
              icon={<ExternalLinkIcon />}
              href="https://phantom.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Install phantom wallet
            </Link>
          )}
        </div>
      </div>
      <div className={styles["content"]}>
        {isPhantomWalletInstalled && isConnected && <ImageGrid />}
      </div>
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
    </main>
  );
}
