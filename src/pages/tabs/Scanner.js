/*global chrome*/
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import useContract from "../../utils/useContract";
import axios from "axios";

export default function Home() {
  const [url, setUrl] = useState(null);
  const [details, setDetails] = useState(false);
  const [scam, setScam] = useState(false);
  const [honeypot, setHoneypot] = useState(false);
  const [protocol, setProtocol] = useState("Loading protocol");

  const checkprotocol = () => {
    if (url == null) return;
    var split = url?.toString().split("/");
    console.log(split);

    const deprotocol = ["ipfs:", "ipns:"];
    const ceprotocol = ["https:", "http:"];

    if (ceprotocol.some((v) => split[0].includes(v))) {
      console.log("It is a centralized protocol");
      setProtocol("Centralized");
    }
    if (deprotocol.some((v) => split[0].includes(v))) {
      console.log("It is a decentralized protocol");
      setProtocol("Decentralized");
    }
  };

  const checkHoneypot = () => {
    const options = {
      method: "GET",
      url: "https://honeypotapi.p.rapidapi.com/api/v1/scan/",
      params: {
        factory_address: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
        token_b: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        chain: "bsc",
        exchange: "Pancakeswap v2",
        token_a: "0xc9882def23bc42d53895b8361d0b1edc7570bc6a",
        router_address: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
      },
      headers: {
        "X-RapidAPI-Host": "honeypotapi.p.rapidapi.com",
        "X-RapidAPI-Key": "8b825c828bmsh13d49818fb651d5p115086jsnfceb2ea3d2e6",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const scamCheck = async () => {
    const res = await axios.get(`https://api.cryptoscamdb.org/v1/scams`);
    console.log(res.data);
    console.log(res.data.result[1].url);
    for (let i = 0; i <= 9795; i++) {
      if (url == res.data.result[i].url) {
        setScam(true);
        console.log(res.data.result[i].url);
      }
    }
  };

  const mismatch = async() => {
    const res = await axios.get("https://gateway.ipfs.io/ipfs/bafybeibdgojvim43qlscitt7oodi574yd5lkd2w6zgigksdyue2gfaztma/scam.json")
  }

  const tokenBlacklist = async () => {
    const res = await axios.get("https://raw.githubusercontent.com/dappradar/tokens-blacklist/main/all-tokens.json");
    console.log(res.data);
  }

  const phishingCheck = async () => {
    const res = await axios.get(
      "https://gateway.ipfs.io/ipfs/bafybeibdgojvim43qlscitt7oodi574yd5lkd2w6zgigksdyue2gfaztma/scam.json"
    );
    console.log(res.data);
    console.log(res.data.sites[0]);
    for (let i = 0; i < 2; i++) {
      if (url == res.data.sites[i]) {
        setScam(true);
        console.log("SCAMMO!", res.data.sites[i]);
      }
    }
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
      checkprotocol();
      phishingCheck();
      checkHoneypot();
    }
  }, [url]);

  return (
    <div className="flex justify-center">
      {details == false ? (
        <div className="bg-darkGray rounded-lg mt-3 selectionwindow">
          <div className="">
            <h2 className="title text-lightGray mt-3 ml-3">Scan report</h2>
            <div class="flex flex-wrap -mx-2 overflow-hidden ml-3 mr-3">
              <button
                onClick={() => setDetails(true)}
                class="my-2 px-2 mr-2 overflow-hidden bg-lightGray rounded-lg text-xs p-1 text-green-200"
              >
                Smart contracts
              </button>
              {protocol == "Centralized" && (
                <button
                  onClick={() => setDetails(true)}
                  class="my-2 px-2 mr-2 overflow-hidden bg-lightGray rounded-lg text-xs p-1 text-yellow-400"
                >
                  Centralized domain
                </button>
              )}
              {scam == true && (
                <button
                  onClick={() => setDetails(true)}
                  class="my-2 px-2 mr-2 overflow-hidden bg-lightGray rounded-lg text-xs p-1 text-red-400"
                >
                  Scam
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-darkGray rounded-lg mt-3 selectionwindow">
          <div className="flex space-x-3">
            <svg
              onClick={() => setDetails(false)}
              class="w-4 h-4 mt-3 ml-3 text-green-200 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            <h2 className="title text-lg text-green-300 mt-2 ml-3">
              Smart contracts
            </h2>
          </div>
          <p className="text-gray-500 text-sm mt-4 ml-3">
            Smart contracts are immutable and highly-secure programs that run on
            the blockchain. They are censorship resistant and can not be
            manupulated. Smart contracts play a vital role in web3 applications.
          </p>
        </div>
      )}
    </div>
  );
}
