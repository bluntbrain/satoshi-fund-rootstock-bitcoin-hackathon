<img src="rootstock-logo.jpg" alt="RSK Logo" style="width:20%; height: auto; align-items: center;" />
# SatoshiFund

SatoshiFund is a Bitcoin-backed lending platform built on Rootstock (RSK). It allows Bitcoin holders to leverage their BTC as collateral to access liquidity in the form of stablecoins, without needing to sell their BTC. The platform offers secure, customizable loans, flexible repayment options, and real-time price alerts.

**Live App**: [https://satoshifund.vercel.app/](https://satoshifund.vercel.app/)

## Smart Contract Addresses (Rootstock Testnet)

- **RBTC Token Address**: `0xb1DCFD6B8E1EA70e6FCc72Ff013a4306006830e8`
- **USDT Token Address**: `0x3B1f74b345bc49CF0300f987063D6a98F29C3132`
- **SatoshiFund Contract Address**: `0x1454F8FA7b48b6127eEC8ed0E78F9879764a51e9`

## Features

### 1. Borrow Without Selling

Bitcoin holders can deposit BTC as collateral and borrow stablecoins, providing cash liquidity without selling their BTC holdings.

### 2. Flexible Collateral and Interest Rates

SatoshiFund offers customized collateralization ratios and interest rates, allowing users to receive tailored loan terms based on their profile.

### 3. Transparent and Secure

The platform is built on Rootstock, leveraging its smart contract capabilities and ensuring that BTC remains within the Bitcoin ecosystem.

### 4. Easy Repayment

Users can repay their loans with flexible repayment options. Interest is calculated only on the outstanding balance, allowing users to manage their debt effectively.

### 5. Real-Time Price Alerts

Real-time notifications alert users to significant changes in BTC price, helping them manage their loans and avoid potential liquidations.

## Future Scope

- **Peer-to-Peer (P2P) Lending**: Enable direct connections between lenders and borrowers for a fully decentralized lending experience.
- **Yield Farming**: Provide yield opportunities through staking and liquidity provision.
- **Multi-Asset Collateral**: Expand collateral options to include additional cryptocurrencies.
- **Fiat Integration**: Introduce fiat on/off ramps for direct bank transfers.
- **Enhanced Security**: Offer optional DeFi insurance for added security on loaned assets.
- **DAO Governance**: Implement a DAO for community-led governance and platform decision-making.

## Project Setup## Project Setup

To run the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the local development server**:

   ```bash
   npm run dev
   ```

4. **Configure Environment Variables (if required)**: Ensure the smart contract addresses are set in your frontend environment as needed.

## Technical Details

### Dependencies

- Web3.js: Used to interact with the Rootstock blockchain and smart contracts.
- React.js: For the front-end framework.
- Axios: For handling HTTP requests where needed.

### Smart Contracts Overview

- RBTC Token (0xb1DCFD6B8E1EA70e6FCc72Ff013a4306006830e8): Custom token on the testnet representing BTC.
- USDT Token (0x3B1f74b345bc49CF0300f987063D6a98F29C3132): Custom stablecoin for simulating USDT.
- SatoshiFund Contract (0x1454F8FA7b48b6127eEC8ed0E78F9879764a51e9): Main contract handling loan logic, including collateral management, loan requests, repayments, and liquidation.

### Testing Setup

Since no testnet bridge was available on Rootstock, mock tokens (RBTC for Bitcoin and USDT for stablecoin) were created to simulate BTC and USDT behavior for accurate development and testing.

### How It Works

- **Collateral Deposit**: Users deposit RBTC as collateral to secure their loans.
- **Request Loan**: Based on collateral and profile-based terms, users can request stablecoin loans.
- **Repay Loan**: Users repay loans in parts or full. Collateral is released when loans are repaid.
- **Manage Risks**: Real-time alerts and customizable terms help users manage their collateral against BTC price fluctuations.
