import React, { useState } from "react";
import { ethers } from "ethers";
import { contractABI } from "../ContractABI/contractABI";
import { contractAddress } from "../ContractABI/contractAddress";

const Main = () => {
  const { ethereum } = window;
  const [paragraph1, setpargraph1] = useState("");
  const [paragraph2, setpargraph2] = useState("");
  const connectMetamask = async () => {
    if (window.ethereum !== "undeined") {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);
      setpargraph1(accounts[0]);
    }
  };

  let contractApple;

  const connectContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    contractApple = new ethers.Contract(contractAddress, contractABI, signer);
    const myData = await contractApple.target;
    setpargraph2(myData);
    
    //bonus:
    console.log(contractApple.target);
  }
  
  console.log(contractApple)
  return (
    <>
   
      <button onClick={connectMetamask}>Connect Metamask</button>
      <p>{paragraph1}</p>
      
      <button onClick={connectContract}>Connect Contract</button>
      <p>{paragraph2}</p>
    </>
  );
};

export default Main;
