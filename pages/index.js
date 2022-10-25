import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from '../components/Logo';
import { ethers } from 'ethers';

export default function Home() {

  const [address, setAddress] = useState("");
  const [nftId, setNftId] = useState("");

  useEffect(() => {
    
  }, [address])

  const connectWallet = async () => {
    if(typeof window.ethereum !== 'undefined') {
    
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    setAddress(accounts[0]);

    }
  }

  //address

  const contractAddress = "0x889920F8EF1675f3d5d5E4e1C411CCd8D63695e1"
  //contract ABI
  const abi = [
    {
      "inputs": [],
      "name": "buyBag",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "buyBennie",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "buyShoes",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "balance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  

  const buyShoe = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const transaction = await contract.buyShoes({ value: ethers.utils.parseEther(".001")});
    await transaction.wait();
  }

  const buyBennie = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const transaction = await contract.buyBennie({ value: ethers.utils.parseEther(".001")});
    await transaction.wait();
  }

  const buyBag = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const transaction = await contract.buyBag({ value: ethers.utils.parseEther(".001")});
    await transaction.wait();
  }

  const getNftData = async () => {
    
    if(!address) return;

    const response = await fetch(`https://api.rarible.org/v0.1/items/byOwner?owner=ETHEREUM:0x4765273c477c2dc484da4f1984639e943adccfeb`)
    
    const data = await response.json();

    console.log(data);
  }

  useEffect(() => {
    getNftData();
  }, [address]);

  return (
    <div
    className="h-screen"
    style={{
      backgroundColor: 'whitesmoke',
    }}
    >
      <Head>
        <title>Mike's Shoes</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
      style={{
        backgroundColor: 'red',
      }}
      className='flex justify-between px-24 items-center py-4 border-b solid border-gray w-full'
      >
          <Logo />
          <div>
            <Button
            onClick={connectWallet}
            >Connect Wallet</Button>
          </div>
      </Navbar>
      <p
      className='text-center py-3'
      >Account: {address}</p>
      <div
      className="flex justify-center py-10"
      >
      <div
      className="w-[800px] flex flex-col justify-center items-center"
      >
        <div
        style={{
          backgroundColor: 'white',
        }}
        className="m-2 flex justify-between items-center w-full border-solid border-2 border-indigo-600 p-5 rounded-md"
        >
          <Image src="/shoes.jpg" height={75} width={75}/>
          <div
          className="w-24 flex flex-col items-center"
          >
          <p>$80.00</p>
          <Button
          onClick={buyShoe}
          >buy</Button>
          </div>
          
        </div>
        <div
        style={{
          backgroundColor: "white", 
        }}
        className="m-2 flex justify-between items-center w-full border-solid border-2 border-yellow-600 p-5 rounded-md"
        >
          <Image src="/hat.jpg" height={75} width={75} />
          <div
          className="w-24 flex flex-col items-center"
          >
            <p>$30.00</p>
          <Button
          onClick={buyBennie}
          >buy</Button>
          </div>
          
        </div>
        <div
        style={{
          backgroundColor: "white",
        }}
        className="m-2 flex justify-between items-center w-full border-solid border-2 border-green-600 p-5 rounded-md"
        >
          <Image src="/bag.jpg" height={75} width={75} />
          <div
          className="w-24 flex flex-col items-center"
          >
            <p>$100.00</p>
          <Button
          onClick={buyBag}
          >buy</Button>
          </div>
          
        </div>
      </div>
      </div>
     
      </div>
  )
}

const Navbar = styled.div``;

const Button = styled.button`
border: 0;
margin: 5px;
  outline: 0;
  font-size: 16px;
  border-radius: 320px;
  padding: 8px;
  background-color:#EBECF0;
  text-shadow: 1px 1px 0 #FFF;
box-shadow:  inset 2px 2px 5px #BABECC, inset -5px -5px 10px #FFF;
width: 100%;
color:#61677C;
  font-weight: bold;
  box-shadow: -5px -5px 20px $color-white,  5px 5px 20px #BABECC;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  font-weight: 600;
  
  &:hover {
    box-shadow: -2px -2px 5px #FFF, 2px 2px 5px #BABECC;
  }
`;


