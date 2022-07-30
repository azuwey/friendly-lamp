import React, { createContext, PropsWithChildren, useContext, useState } from "react";
import { PhantomProvider } from "./types";

const PhantomWalletContext = createContext<{
  provider: PhantomProvider | undefined;
  publicKeyString: string;
  isConnected: boolean;
  detectProvider: () => Error | null;
  tryConnectWallet: () => Promise<Error | null>;
  tryDisconnectWallet: () => Promise<Error | null>;
}>({
  provider: undefined,
  publicKeyString: "",
  isConnected: false,
  detectProvider: () => {
    throw new Error("PhantomWalletContext cannot be used without PhantomWalletProvider");
  },
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
  }>({
    provider: undefined,
    publicKeyString: "",
    isConnected: false,
  });

  const detectProvider = (): Error | null => {
    if ("phantom" in window) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        setWallet((prevState) => ({ ...prevState, provider }));
        return null;
      }
    }

    return new Error("Phantom wallet not installed");
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

  return (
    <PhantomWalletContext.Provider
      value={{ ...wallet, detectProvider, tryConnectWallet, tryDisconnectWallet }}
    >
      {props.children}
    </PhantomWalletContext.Provider>
  );
}

export function usePhantomWallet() {
  return useContext(PhantomWalletContext);
}
