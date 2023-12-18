import { useState, useEffect } from "react";
import { ethers } from "ethers";
import QRCode from 'qrcode.react';
import { format } from 'date-fns';
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const updateTransactionHistory = (type, amount) => {
    const transactionType = type === 'deposit' ? 'CR' : 'DR';
    const transaction = {
      type: transactionType,
      amount,
      date: new Date(),
    };

    setTransactionHistory(prev => [transaction, ...prev.slice(0, 4)]);
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(depositAmount);
      await tx.wait();
      getBalance();
      updateTransactionHistory('deposit', depositAmount);
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(withdrawAmount);
      await tx.wait();
      getBalance();
      updateTransactionHistory('withdraw', withdrawAmount);
    }
  };

  const miniStatement = () => (
    <div>
      <h2>Mini Statement</h2>
      <p>Scan this QR code to view mini statement</p>
      <ul>
        {transactionHistory.map((transaction, index) => (
          <li key={index}>
            {index + 1}. {transaction.type} - {transaction.amount} ETH - {transaction.date.toString()}
          </li>
        ))}
      </ul>
      <QRCode value={JSON.stringify(transactionHistory)} />
    </div>
  );

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <div className="user-actions">
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(parseInt(e.target.value))}
            placeholder="Enter deposit amount"
          />
          <button onClick={deposit}>Deposit</button>
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(parseInt(e.target.value))}
            placeholder="Enter withdrawal amount"
          />
          <button onClick={withdraw}>Withdraw</button>
        </div>
      </div>
    );
  };

  useEffect(() => { getWallet(); }, []);

  return (
    <main className="container">
      <header><h1>Welcome to the Metacrafters ATM!</h1></header>
      {initUser()}
      {miniStatement()}
      <style jsx>{`
        .container {
          text-align: center;
          background-color: #ffa500; /* Orange background color */
          padding: 20px;
        }

        .user-actions {
          margin-top: 10px;
        }

        input {
          margin-right: 10px;
          padding: 5px;
        }

        button {
          padding: 5px;
        }
      `}
      </style>
    </main>
  );
}
