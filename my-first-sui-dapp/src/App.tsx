// import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
// import { isValidSuiObjectId } from "@mysten/sui/utils";
// import { Box, Container, Flex, Heading } from "@radix-ui/themes";
// import { useState } from "react";
// import { Counter } from "./Counter";
// import { CreateCounter } from "./CreateCounter";

// function App() {
//   const currentAccount = useCurrentAccount();
//   const [counterId, setCounter] = useState(() => {
//     const hash = window.location.hash.slice(1);
//     return isValidSuiObjectId(hash) ? hash : null;
//   });

//   return (
//     <>
//       <Flex
//         position="sticky"
//         px="4"
//         py="2"
//         justify="between"
//         style={{
//           borderBottom: "1px solid var(--gray-a2)",
//         }}
//       >
//         <Box>
//           <Heading>dApp Starter Template</Heading>
//         </Box>

//         <Box>
//           <ConnectButton />
//         </Box>
//       </Flex>
//       <Container>
//         <Container
//           mt="5"
//           pt="2"
//           px="4"
//           style={{ background: "var(--gray-a2)", minHeight: 500 }}
//         >
//           {currentAccount ? (
//             counterId ? (
//               <Counter id={counterId} />
//             ) : (
//               <CreateCounter
//                 onCreated={(id) => {
//                   window.location.hash = id;
//                   setCounter(id);
//                 }}
//               />
//             )
//           ) : (
//             <Heading>Please connect your wallet</Heading>
//           )}
//         </Container>
//       </Container>
//     </>
//   );
// }

// export default App;




import { useState } from "react";
import {
  ConnectButton,
  useCurrentWallet,
  useSignAndExecuteTransactionBlock,
} from "@mysten/dapp-kit";
import { TransactionBlock } from "@mysten/sui";

const PACKAGE_ID = "YOUR_PACKAGE_ID"; // replace with your package id

function App() {
  const { currentWallet } = useCurrentWallet();
  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const mintNFT = () => {
    if (!currentWallet) {
      alert("⚠️ Please connect your wallet first!");
      return;
    }

    const tx = new TransactionBlock();
    tx.moveCall({
      target: `${PACKAGE_ID}::nft::mint`,
      arguments: [
        tx.pure.string(name),
        tx.pure.string(description),
        tx.pure.string(url),
      ],
    });

    signAndExecute(
      { transactionBlock: tx },
      {
        onSuccess: (result) => {
          console.log("✅ NFT Minted:", result);
          alert("NFT Minted Successfully!");
        },
        onError: (err) => {
          console.error("❌ Mint error:", err);
          alert("Error minting NFT");
        },
      }
    );
  };

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sui NFT Minter</h1>
        <ConnectButton />
      </header>

      <div className="space-y-3 max-w-md">
        <input
          type="text"
          placeholder="NFT Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="NFT Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button
          onClick={mintNFT}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Mint NFT
        </button>
      </div>
    </div>
  );
}

export default App;
