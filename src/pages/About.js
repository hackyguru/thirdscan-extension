import React, { useState } from "react";
import { ethers } from "ethers";

export default function About() {
  const [walletaddress, setWalletaddress] = useState(null);
  const contractaddress = "0xB55E20cc4026238834632d9BFd6adb3cfbCCFA32";
  let wa;
  const contractAbi = [
    {
      inputs: [
        {
          internalType: "string",
          name: "url",
          type: "string",
        },
        {
          internalType: "bool",
          name: "blacklisted",
          type: "bool",
        },
        {
          internalType: "uint256",
          name: "stake",
          type: "uint256",
        },
      ],
      name: "addDapp",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "url",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "defiscore",
          type: "uint256",
        },
      ],
      name: "downvote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "url",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "defiscore",
          type: "uint256",
        },
      ],
      name: "upvote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "dapps",
      outputs: [
        {
          internalType: "string",
          name: "url",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "score",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "blacklisted",
          type: "bool",
        },
        {
          internalType: "uint256",
          name: "stake",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "url",
          type: "string",
        },
      ],
      name: "viewvotes",
      outputs: [
        {
          components: [
            {
              internalType: "string",
              name: "url",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "score",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "blacklisted",
              type: "bool",
            },
            {
              internalType: "uint256",
              name: "stake",
              type: "uint256",
            },
          ],
          internalType: "struct Regulation.Dapp",
          name: "dapper",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const addDapp = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = await provider.getSigner();

    const wa = await signer.getAddress();
    console.log(wa);

    const contract = new ethers.Contract(contractaddress, contractAbi, signer);
    let add = await contract.addDapp("aaa", false, 400);
    console.log("Added em", add);
  };

  const upvote = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = await provider.getSigner();

    const wa = await signer.getAddress();
    console.log(wa);

    const contract = new ethers.Contract(contractaddress, contractAbi, signer);
    let voted = await contract.upvote("aaa", 200);
    console.log("Upvoted", voted);
  };

  const viewvotes = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rinkeby.infura.io/v3/fab74920721344ea9eae822275ebf011"
    );

    const contract = new ethers.Contract(
      contractaddress,
      contractAbi,
      provider
    );
    let votes = await contract.viewvotes("aaaaa");
    console.log("Votes of aaaaa", votes[0]);
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      {walletaddress == null ? (
        <button
          onClick={() => viewvotes()}
          className="bg-darkGray p-2 title rounded-lg"
        >
          View votes
        </button>
      ) : (
        <div>
          <h1>{walletaddress}</h1>
          <button className="bg-darkGray p-2 title rounded-lg">
            Fetchy Petchy
          </button>
        </div>
      )}
    </div>
  );
}
