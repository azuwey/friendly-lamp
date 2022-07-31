import React from "react";
import ReactDOM from "react-dom/client";
import { PhantomWalletProvider } from "@contexts/phantomWallet";
import { ImageListProvider } from "@contexts/imageList";
import App from "@features/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PhantomWalletProvider>
      <ImageListProvider>
        <App />
      </ImageListProvider>
    </PhantomWalletProvider>
  </React.StrictMode>,
);
