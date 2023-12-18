# Metacrafters ATM 

## Overview
The Metacrafters ATM is a decentralized application (DApp) that leverages Ethereum blockchain and React to provide users with a simple interface for managing their funds. This README provides an overview of the key features, setup instructions, and project structure.

## Smart Contract (Solidity)
The `Assessment.sol` smart contract is deployed on the Ethereum blockchain, offering the following features:

- **Deposit and Withdrawal**: The contract owner can deposit and withdraw funds, maintaining the user's balance.
- **Interest Accrual**: The owner has the ability to reinvest interest by accruing a percentage of the current balance.
- **Account Locking**: The owner can lock and unlock the account, controlling access to fund-related actions.

## Frontend (React)
The React-based frontend enables users to interact with the smart contract seamlessly. Here's what you can do:

### Installation
1. Clone the repository.
2. Navigate to the project directory and install dependencies using `npm install`.

### Usage

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm install qrcode.react

then type npm install date-fns

 then  npm i

2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

### Smart Contract Address
The smart contract is deployed at the Ethereum address: `0x5FbDB2315678afecb367f032d93F642f64180aa3`.

### Technologies Used
- **Solidity**: Smart contract language for Ethereum.
- **React**: JavaScript library for building the user interface.
- **MetaMask**: Wallet provider for Ethereum.

### Project Structure
- `contracts/Assessment.sol`: Solidity smart contract.
- `src/HomePage.js`: React component for the frontend.

### Credits
This project is developed by Niranjan D N

### License
This project is licensed under MIT license. 
