# Uniswap V2 Bot - Web3 Learning Project

![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

A comprehensive educational project designed to teach Web3 developers how to interact with Uniswap V2 protocol. This bot demonstrates essential DeFi concepts including token swapping, price queries, and smart contract interactions using ethers.js.

## 🎯 Learning Objectives

This project is perfect for:
- **Junior Developers** getting started with Web3 development
- **Intermediate Developers** wanting to understand DeFi protocols
- **Web3 Enthusiasts** learning about automated trading basics
- **Students** studying blockchain and smart contract interactions

## 📚 What You'll Learn

### Core Web3 Concepts
- Smart contract interactions using ethers.js
- ERC-20 token operations (balances, approvals, transfers)
- Understanding gas fees and transaction lifecycle
- Working with ABIs (Application Binary Interfaces)

### DeFi Fundamentals
- How Automated Market Makers (AMMs) work
- Token swapping mechanics on Uniswap V2
- Price impact and slippage protection
- Liquidity pool interactions

### Advanced Topics
- Environment variable management for security
- Error handling in blockchain applications
- Transaction monitoring and confirmation
- Building production-ready Web3 applications

## 🏗️ Project Structure

```
UniswapV2-Bot/
├── src/
│   └── main.ts          # Main bot logic and functions
├── abi/
│   └── routerV2.json    # Uniswap V2 Router ABI
├── README.md            # This file
└── package.json         # Project dependencies
```

## 🚀 Features

### ✅ Core Functionality
- **Real-time Price Queries**: Get current exchange rates between tokens
- **Token Balance Checking**: View wallet balances for ETH, USDC, and WETH
- **Swap Simulations**: Calculate expected outputs with slippage protection
- **Smart Contract Interactions**: Approve tokens and execute swaps
- **Transaction Monitoring**: Track transaction status and confirmations

### 🛡️ Safety Features
- Comprehensive error handling
- Environment variable validation
- Balance verification before swaps
- Slippage protection
- Transaction confirmation logging

## 📋 Prerequisites

Before getting started, make sure you have:

1. **Node.js** (v16 or higher)
2. **TypeScript** knowledge (basic to intermediate)
3. **Ethereum wallet** with some ETH for gas fees
4. **RPC endpoint** (Infura, Alchemy, or similar)
5. **Basic understanding** of blockchain concepts

## ⚙️ Installation

1. **Clone the repository:**
```bash
git clone https://github.com/DevWonder01/UniswapV2-Bot.git
cd UniswapV2-Bot
```

2. **Install dependencies:**
```bash
npm install
```

3. **Install additional required packages:**
```bash
npm install ethers@^6.0.0
npm install typescript ts-node @types/node -D
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Ethereum RPC URL (get from Infura, Alchemy, etc.)
RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID

# Your wallet private key (KEEP THIS SECRET!)
PRIVATE_KEY=your_private_key_here
```

⚠️ **Security Warning**: Never commit your private key to version control!

### Supported Networks

This bot is configured for **Ethereum Mainnet** by default. Token addresses:
- **USDC**: `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`
- **WETH**: `0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2`
- **Uniswap V2 Router**: `0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D`

## 🏃‍♂️ Usage

### Basic Execution

Run the bot to see current prices and balances:

```bash
npx ts-node src/main.ts
```

### Expected Output

```
Initializing Uniswap V2 Bot...
Wallet address: 0x1234...abcd

--- Current Balances ---
ETH Balance: 0.5 ETH
USDC Balance: 1000.0 USDC
WETH Balance: 0.0 WETH

--- Price Information ---
100 USDC → 0.031456 WETH
0.031456 WETH → 1 USDC (3178.32 USDC needed)
Current Price: 1 WETH = 3178.32 USDC
Current Price: 1 USDC = 0.000315 WETH

Bot execution completed successfully!
```

## 📖 Code Walkthrough

### Key Functions Explained

#### 1. **Token Swapping**
```typescript
const swapTokenBaseForQuote = async (
    routerV2Contract: ethers.Contract,
    amountIn: ethers.BigNumberish,
    slippage: number,
    recipient: string
) => {
    // Calculates minimum output based on slippage tolerance
    // Executes the swap through Uniswap V2 Router
}
```

**Learning Points:**
- How slippage protection works
- Smart contract method calling
- Transaction lifecycle management

#### 2. **Price Queries**
```typescript
const getAmountOut = async (
    routerV2Contract: ethers.Contract,
    amountIn: ethers.BigNumberish,
    tokenAAddress: string = USDC_ADDRESS,
    tokenBAddress: string = WETH_ADDRESS
) => {
    // Queries Uniswap for expected output amount
    // Used for price discovery and slippage calculations
}
```

**Learning Points:**
- Reading data from smart contracts
- Understanding AMM pricing mechanisms
- Working with BigNumber arithmetic

#### 3. **Token Management**
```typescript
const checkAndApproveToken = async (
    tokenContract: ethers.Contract,
    spenderAddress: string,
    amount: ethers.BigNumberish,
    wallet: ethers.Wallet
) => {
    // Checks current allowance and approves if needed
    // Essential for ERC-20 token interactions
}
```

**Learning Points:**
- ERC-20 approval mechanism
- Gas optimization strategies
- Smart contract security patterns

## 🔬 Experiments to Try

### Beginner Level
1. **Modify token pairs**: Change from USDC/WETH to other token pairs
2. **Adjust amounts**: Try different swap amounts and observe price impact
3. **Compare prices**: Check prices across different time periods

### Intermediate Level
1. **Add new tokens**: Integrate other ERC-20 tokens
2. **Implement multi-hop swaps**: Swap through multiple pools
3. **Add price alerts**: Notify when price reaches certain levels

### Advanced Level
1. **Arbitrage detection**: Compare prices across different DEXs
2. **MEV protection**: Implement frontrunning protection
3. **Custom slippage**: Dynamic slippage based on volatility

## 🧪 Testing Your Understanding

Try to answer these questions after studying the code:

1. **Why do we need to approve tokens before swapping?**
2. **What is slippage and why is it important?**
3. **How does Uniswap V2 calculate exchange rates?**
4. **What happens if you set slippage to 0%?**
5. **Why might a transaction fail even with proper approvals?**

## 🚨 Common Issues & Solutions

### Transaction Failures
```
Error: insufficient allowance
```
**Solution**: Ensure token approval before swapping

### Price Impact Too High
```
Error: UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT
```
**Solution**: Increase slippage tolerance or reduce swap amount

### Gas Estimation Failed
```
Error: cannot estimate gas
```
**Solution**: Check token balances and ensure sufficient ETH for gas

## 🔐 Security Best Practices

### For Development
- Use testnets for learning (Goerli, Sepolia)
- Start with small amounts on mainnet
- Always test token approvals first

### For Production
- Use hardware wallets or secure key management
- Implement proper access controls
- Add comprehensive monitoring and alerts
- Consider using multi-signature wallets

## 🛠️ Extending the Bot

### Ideas for Enhancement

1. **Web Interface**: Build a React frontend
2. **Database Integration**: Store transaction history
3. **Multiple Wallets**: Support wallet management
4. **Advanced Strategies**: Implement trading algorithms
5. **Cross-chain Support**: Add other blockchain networks

### Contribution Guidelines

1. Fork the repository
2. Create a feature branch
3. Add comprehensive tests
4. Update documentation
5. Submit a pull request

## 📚 Additional Learning Resources

### DeFi Education
- [Uniswap V2 Whitepaper](https://uniswap.org/whitepaper.pdf)
- [Ethereum Documentation](https://ethereum.org/en/developers/docs/)
- [DeFi Pulse Academy](https://defipulse.com/defi-explained)

### Technical Resources
- [ethers.js Documentation](https://docs.ethers.org/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)

### Tools & Platforms
- [Remix IDE](https://remix.ethereum.org/) - Smart contract development
- [Etherscan](https://etherscan.io/) - Blockchain explorer
- [Tenderly](https://tenderly.co/) - Smart contract monitoring

## 🤝 Community & Support

- **Issues**: Report bugs or request features in the GitHub issues
- **Discussions**: Join our community discussions
- **Twitter**: Follow for updates and DeFi insights
- **Discord**: Connect with other learners and developers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This bot is for **educational purposes only**. Cryptocurrency trading involves substantial risk and may result in financial loss. The authors are not responsible for any losses incurred while using this software. Always:

- Do your own research (DYOR)
- Start with small amounts
- Use testnets for learning
- Never invest more than you can afford to lose

## 🙏 Acknowledgments

- **Uniswap Labs** for building the revolutionary AMM protocol
- **Ethereum Foundation** for the blockchain infrastructure
- **ethers.js team** for the excellent Web3 library
- **DeFi community** for continuous innovation and education

---

**Happy Learning! 🚀**

*Remember: The best way to learn Web3 is by building. Start small, experiment often, and never stop learning!*
