import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { PhantomProvider } from "./types";

const PhantomWalletContext = createContext<{
  provider: PhantomProvider | undefined;
  publicKeyString: string;
  isConnected: boolean;
  isInstalled: boolean;
  tryConnectWallet: () => Promise<Error | null>;
  tryDisconnectWallet: () => Promise<Error | null>;
}>({
  provider: undefined,
  publicKeyString: "",
  isConnected: false,
  isInstalled: false,
  tryConnectWallet: () => {
    throw new Error("PhantomWalletContext cannot be used without PhantomWalletProvider");
  },
  tryDisconnectWallet: () => {
    throw new Error("PhantomWalletContext cannot be used without PhantomWalletProvider");
  },
});

export function PhantomWalletProvider(props: PropsWithChildren) {
  const [wallet, setWallet] = useState<{
    provider: PhantomProvider | undefined;
    publicKeyString: string;
    isConnected: boolean;
    isInstalled: boolean;
  }>({
    provider: undefined,
    publicKeyString: "",
    isConnected: false,
    isInstalled: false,
  });

  const detectProvider = () => {
    if ("phantom" in window) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        setWallet((prevState) => ({ ...prevState, provider, isInstalled: true }));
      }
    }
  };

  const tryConnectWallet = async (): Promise<Error | null> => {
    if (wallet.provider === undefined) {
      return new Error("Phantom Button not detected");
    }

    const response = await wallet.provider.connect();
    setWallet((prevState) => ({
      ...prevState,
      isConnected: true,
      publicKeyString: response.publicKey.toString(),
    }));

    return null;
  };

  const tryDisconnectWallet = async (): Promise<Error | null> => {
    if (wallet.provider === undefined) {
      return new Error("Phantom Button not detected");
    }

    await wallet.provider.disconnect();
    setWallet((prevState) => ({
      ...prevState,
      isConnected: false,
      publicKeyString: "",
    }));

    return null;
  };

  useEffect(() => {
    detectProvider();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PhantomWalletContext.Provider value={{ ...wallet, tryConnectWallet, tryDisconnectWallet }}>
      {props.children}
    </PhantomWalletContext.Provider>
  );
}

export function usePhantomWallet() {
  return useContext(PhantomWalletContext);
}
