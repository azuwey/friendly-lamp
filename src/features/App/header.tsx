import React, { useMemo } from "react";
import { ExternalLinkIcon, PhotographIcon, SparklesIcon } from "@heroicons/react/outline";
import Button from "@components/Button";
import { Link } from "@components/Link";
import { usePhantomWallet } from "@contexts/phantomWallet";
import styles from "./style.module.css";

export default function Header() {
  const { publicKeyString, isConnected, isInstalled, tryConnectWallet, tryDisconnectWallet } =
    usePhantomWallet();
  const shortPublicKeyString = useMemo(() => {
    const firstPart = publicKeyString.substring(0, 5);
    const lastPart = publicKeyString.substring(publicKeyString.length - 5);
    return `${firstPart}...${lastPart}`;
  }, [publicKeyString]);

  return (
    <header className={styles["header"]}>
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
        {isInstalled && !isConnected && (
          <Button onClick={tryConnectWallet}>Connect to Phantom Wallet</Button>
        )}
        {isInstalled && isConnected && (
          <Button onClick={tryDisconnectWallet}>{`Disconnect: ${shortPublicKeyString}`}</Button>
        )}
        {!isInstalled && (
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
    </header>
  );
}
