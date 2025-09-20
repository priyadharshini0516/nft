// import React from "react";
// import ReactDOM from "react-dom/client";
// import "@mysten/dapp-kit/dist/index.css";
// import "@radix-ui/themes/styles.css";

// import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Theme } from "@radix-ui/themes";
// import App from "./App.tsx";
// import { networkConfig } from "./networkConfig.ts";

// const queryClient = new QueryClient();

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <Theme appearance="dark">
//       <QueryClientProvider client={queryClient}>
//         <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
//           <WalletProvider autoConnect>
//             <App />
//           </WalletProvider>
//         </SuiClientProvider>
//       </QueryClientProvider>
//     </Theme>
//   </React.StrictMode>,
// );




import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  WalletProvider,
  SuiClientProvider,
  createNetworkConfig,
} from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";

// Configure Sui networks
const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl("localnet") },
  devnet: { url: getFullnodeUrl("devnet") },
  testnet: { url: getFullnodeUrl("testnet") },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SuiClientProvider networks={networkConfig} defaultNetwork="devnet">
      <WalletProvider>
        <App />
      </WalletProvider>
    </SuiClientProvider>
  </React.StrictMode>
);
