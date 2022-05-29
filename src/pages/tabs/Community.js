/*global chrome*/
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { ethers } from "ethers";

export default function Community() {
  const [url, setUrl] = useState(null);
  const [positive, setPositive] = useState(null);
  const [negative, setNegative] = useState(null);
  const [ratio, setRatio] = useState(null);
  const [realwallet, setRealwallet] = useState(false);

  const [walletaddress, setWalletaddress] = useState(null);
  const contractaddress = "0xdddb8d7A798B697D99157F788f54Cae6b6bEE4a4";
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
          name: "positive",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "negative",
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
              name: "positive",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "negative",
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
    console.log("The URL entering view votes is", url);
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rinkeby.infura.io/v3/fab74920721344ea9eae822275ebf011"
    );

    const contract = new ethers.Contract(
      contractaddress,
      contractAbi,
      provider
    );
    let votes = await contract.viewvotes(url);
    console.log("Votes :", votes);
    console.log(
      "Formatted number of hex :",
      ethers.utils.formatUnits(votes[4], 0)
    );
    setPositive(ethers.utils.formatUnits(votes[1], 0));
    setNegative(ethers.utils.formatUnits(votes[2], 0));
    console.log("Positive votes :", positive);
    console.log("Negative votes :", negative);
    let add =
      ethers.utils.formatUnits(votes[1], 0) +
      ethers.utils.formatUnits(votes[2], 0);
    setRatio((ethers.utils.formatUnits(votes[1], 0) * 100) / add);
  };

  useEffect(() => {
    if (url == null) {
      chrome.tabs &&
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const taburl = tabs[0].url;
          setUrl(taburl);
        });
      console.log(url);
    } else {
      console.log("The URL being passed to view votes is", url);
      viewvotes();
    }
  }, [url]);
  return (
    <div className="flex justify-center">
      {walletaddress == null ? (
        <div className="bg-darkGray  justify-center text-center items-center h-full rounded-lg mt-3 selectionwindow">
          <div className="flex justify-evenly mt-5">
            <div className="flex-col space-y-2">
              <svg
                class="w-6 h-6 text-green-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                ></path>
              </svg>
              <p className="text-green-300 title">
                {positive == null ? <p>?</p> : <p>{positive}</p>}
              </p>
            </div>
            <div className="flex-col space-y-2">
              <svg
                class="w-6 h-6 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                ></path>
              </svg>
              <p className="text-red-400 title">
                {" "}
                {negative == null ? <p>?</p> : <p>{negative}</p>}
              </p>
            </div>
          </div>
          <div className="flex mt-5 justify-center">
            <ProgressBar
              className="w-60 title"
              bgColor="teal"
              baseBgColor="#303439"
              completed={ratio}
            />
          </div>
          <div className="mt-8">
            <h2 className="title text-lightGray mt-3 ml-3">
              Please connect your wallet to vote
            </h2>
          </div>
        </div>
      ) : (
        <div className="bg-darkGray  justify-center text-center items-center h-full rounded-lg mt-3 selectionwindow">
          <div className="flex justify-evenly mt-5">
            <div className="flex-col space-y-2">
              <svg
                class="w-6 h-6 text-green-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                ></path>
              </svg>
              <p className="text-green-300 title">60%</p>
            </div>
            <div className="flex-col space-y-2">
              <svg
                class="w-6 h-6 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                ></path>
              </svg>
              <p className="text-red-400 title">60%</p>
            </div>
          </div>
          <div className="flex mt-5 justify-center">
            <ProgressBar
              className="w-60 title"
              bgColor="teal"
              baseBgColor="#303439"
              completed={70}
            />
          </div>
          {realwallet == true ? (
            <div className="mt-8 flex justify-evenly">
              <button className="title bg-gradient-to-br from-green-100 to-green-500 p-2 rounded-lg">
                Support
              </button>
              <button className="title bg-gradient-to-br from-red-300 to-red-500 p-2 rounded-lg">
                Blacklist
              </button>
            </div>
          ) : (
            <div className="flex justify-center mt-8">
              <div className="bg-red-300 rounded-lg p-2 flex space-x-2">
                <svg
                  class="w-5 h-5 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
                  ></path>
                </svg>
                <p className="desc">Your wallet is suspected as bot/scam.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
