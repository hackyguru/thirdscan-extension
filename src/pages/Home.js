/*global chrome*/
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import Community from "./tabs/Community";
import Expert from "./tabs/Expert";
import Scanner from "./tabs/Scanner";
import axios from "axios";

export default function Home(props) {
  const [tab, setTab] = useState(1);
  const [scam, setScam] = useState(false);
  const [title, setTitle] = useState("Unknown");
  const [level, setLevel] = useState(null);
  const [url, setUrl] = useState(null);
  const [protocol, setProtocol] = useState("Loading protocol");

  let siteurl = props.site;
  console.log(siteurl);

  const phishingCheck = async () => {
    const res = await axios.get(
      "https://gateway.ipfs.io/ipfs/bafybeibdgojvim43qlscitt7oodi574yd5lkd2w6zgigksdyue2gfaztma/scam.json"
    );
    console.log(res.data);
    console.log(res.data.sites[0]);
    for (let i = 0; i < 2; i++) {
      if (url == res.data.sites[i]) {
        setScam(true);
        setLevel(10);
        setTitle("Unsafe");
        console.log("SCAMMO!", res.data.sites[i]);
      }
    }
  };

  const goodCheck = async () => {
    const res = await axios.get(
      "https://gateway.ipfs.io/ipfs/bafybeihkc2dwlzctizwrzz4vgpnyil7jg6rpag4rpn4caffhywnts442re/good.json"
    );
    console.log(res.data);
    console.log(res.data.sites[0]);
    for (let i = 0; i < 2; i++) {
      if (url == res.data.sites[i]) {
        setLevel(92);
        setTitle("Safe");
        console.log("GOODIE!", res.data.sites[i]);
      }
    }
  };

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
      goodCheck();
    }
  }, [url]);

  return (
    <div>
      <div className="head pt-7">
        <h1 className="text-center text-white text-2xl title">ThirdScan</h1>
        <div className="w-full justify-center flex mt-7 ">
          <div className="bg-darkGray rounded-lg p-2 space-x-4">
            <input
              placeholder={url}
              className="rounded-lg bg-darkGray text-white p-1 focus-within:border-transparent"
            />
            <button className="bg-white rounded-lg p-1 title">Go</button>
          </div>
        </div>
      </div>
      <hr className="border-darkGray" />
      <div className="flex justify-center">
        <div className="bg-darkGray mt-5 bottomwindow rounded-lg">
          <div className="flex justify-between p-3">
            <div>
              <h1 className="title text-white opacity-25">Site status</h1>
              {title == "Safe" && (
                <h1 className="title text-3xl text-green-400 mt-1">{title}</h1>
              )}
              {title == "Unsafe" && (
                <h1 className="title text-3xl text-red-500 mt-1">{title}</h1>
              )}
              {title == "Use with caution" && (
                <h1 className="title text-3xl text-yellow-400 mt-1">{title}</h1>
              )}
            </div>
            {level > 0 && level < 20 && (
              <div className=" bg-gradient-to-br flex from-red-500 to-red-900 shadow-inner h-16 w-16 rounded-lg justify-center items-center">
                <div>
                  <h2 className="title text-lg">10%</h2>
                  <p className="text-xs text-center">Score</p>
                </div>
              </div>
            )}
            {level > 20 && level < 40 && (
              <div className=" bg-gradient-to-br flex from-red-400 to-red-600 shadow-inner h-16 w-16 rounded-lg justify-center items-center">
                <div>
                  <h2 className="title text-lg">25%</h2>
                  <p className="text-xs text-center">Score</p>
                </div>
              </div>
            )}
            {level > 40 && level < 50 && (
              <div className=" bg-gradient-to-br flex from-red-200 to-red-300 shadow-inner h-16 w-16 rounded-lg justify-center items-center">
                <div>
                  <h2 className="title text-lg">35%</h2>
                  <p className="text-xs text-center">Score</p>
                </div>
              </div>
            )}
            {level > 50 && level < 70 && (
              <div className=" bg-gradient-to-br flex from-yellow-400 to-yellow-700 shadow-inner h-16 w-16 rounded-lg justify-center items-center">
                <div>
                  <h2 className="title text-lg">60%</h2>
                  <p className="text-xs text-center">Score</p>
                </div>
              </div>
            )}
            {level > 70 && level < 90 && (
              <div className=" bg-gradient-to-br flex from-green-200 to-green-400 shadow-inner h-16 w-16 rounded-lg justify-center items-center">
                <div>
                  <h2 className="title text-lg">80%</h2>
                  <p className="text-xs text-center">Score</p>
                </div>
              </div>
            )}
            {level > 90 && level < 100 && (
              <div className=" bg-gradient-to-br flex from-green-600 to-green-900 shadow-inner h-16 w-16 rounded-lg justify-center items-center">
                <div>
                  <h2 className="title text-lg">91%</h2>
                  <p className="text-xs text-center">Score</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-darkGray mt-3 selection rounded-2xl flex justify-between px-1 items-center">
          <button
            onClick={() => setTab(1)}
            className={
              tab == 1
                ? "text-white bg-lightGray p-1 px-3 rounded-xl text-xs "
                : "text-white opacity-30  p-1 px-3 rounded-xl text-xs"
            }
          >
            Scanner
          </button>{" "}
          <button
            onClick={() => setTab(2)}
            className={
              tab == 2
                ? "text-white bg-lightGray p-1 px-3 rounded-xl text-xs "
                : "text-white opacity-30  p-1 px-3 rounded-xl text-xs"
            }
          >
            Expert opinion
          </button>
          <button
            onClick={() => setTab(3)}
            className={
              tab == 3
                ? "text-white bg-lightGray p-1 px-3 rounded-xl text-xs "
                : "text-white opacity-30  p-1 px-3 rounded-xl text-xs"
            }
          >
            Community
          </button>
        </div>
      </div>
      <div>
        <div>
          {tab == 1 && <Scanner />}
          {tab == 2 && <Expert />}
          {tab == 3 && <Community />}
        </div>
      </div>
    </div>
  );
}
