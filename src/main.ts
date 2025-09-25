import { ethers } from "ethers";
import routerV2ABI from "../abi/routerV2.json";

// Uniswap V2 Router Contract Address
const CONTRACT_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

// Token addresses (Mainnet)
const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

// ERC-20 Token ABI (minimal for approval)
const ERC20_ABI = [
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender) external view returns (uint256)",
    "function balanceOf(address account) external view returns (uint256)",
    "function decimals() external view returns (uint8)"
];

const swapTokenBaseForQuote = async (
    routerV2Contract: ethers.Contract,
    amountIn: ethers.BigNumberish,
    slippage: number,
    recipient: string
) => {
    try {
        // Calculate minimum amount out based on slippage tolerance
        const amountsOut = await routerV2Contract.getAmountsOut(amountIn, [USDC_ADDRESS, WETH_ADDRESS]);
        const expectedAmountOut = amountsOut[1];
        const amountOutMin = expectedAmountOut * BigInt(Math.floor((100 - slippage) * 100)) / BigInt(10000);
        
        const path = [USDC_ADDRESS, WETH_ADDRESS];
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now

        console.log(`Swapping ${ethers.formatUnits(amountIn, 6)} USDC for minimum ${ethers.formatUnits(amountOutMin, 18)} WETH`);
        
        const tx = await routerV2Contract.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            recipient,
            deadline
        );

        console.log(`Transaction submitted: ${tx.hash}`);
        const receipt = await tx.wait();
        console.log(`Transaction confirmed in block: ${receipt.blockNumber}`);
        
        return receipt;
    } catch (error) {
        console.error("Error in swapTokenBaseForQuote:", error);
        throw error;
    }
};

const swapTokenQuoteForBase = async (
    routerV2Contract: ethers.Contract,
    amountIn: ethers.BigNumberish,
    slippage: number,
    recipient: string
) => {
    try {
        // Calculate minimum amount out based on slippage tolerance
        const amountsOut = await routerV2Contract.getAmountsOut(amountIn, [WETH_ADDRESS, USDC_ADDRESS]);
        const expectedAmountOut = amountsOut[1];
        const amountOutMin = expectedAmountOut * BigInt(Math.floor((100 - slippage) * 100)) / BigInt(10000);
        
        const path = [WETH_ADDRESS, USDC_ADDRESS];
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now

        console.log(`Swapping ${ethers.formatUnits(amountIn, 18)} WETH for minimum ${ethers.formatUnits(amountOutMin, 6)} USDC`);
        
        const tx = await routerV2Contract.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            recipient,
            deadline
        );

        console.log(`Transaction submitted: ${tx.hash}`);
        const receipt = await tx.wait();
        console.log(`Transaction confirmed in block: ${receipt.blockNumber}`);
        
        return receipt;
    } catch (error) {
        console.error("Error in swapTokenQuoteForBase:", error);
        throw error;
    }
};


const getAmountOut = async (
    routerV2Contract: ethers.Contract,
    amountIn: ethers.BigNumberish,
    tokenAAddress: string = USDC_ADDRESS,
    tokenBAddress: string = WETH_ADDRESS
) => {
    try {
        const path = [tokenAAddress, tokenBAddress];
        const amountsOut = await routerV2Contract.getAmountsOut(amountIn, path);
        return amountsOut;
    } catch (error) {
        console.error("Error in getAmountOut:", error);
        throw error;
    }
};

const getAmountIn = async (
    routerV2Contract: ethers.Contract,
    amountOut: ethers.BigNumberish,
    tokenAAddress: string = WETH_ADDRESS,
    tokenBAddress: string = USDC_ADDRESS
) => {
    try {
        const path = [tokenAAddress, tokenBAddress];
        const amountsIn = await routerV2Contract.getAmountsIn(amountOut, path);
        return amountsIn;
    } catch (error) {
        console.error("Error in getAmountIn:", error);
        throw error;
    }
};

const checkAndApproveToken = async (
    tokenContract: ethers.Contract,
    spenderAddress: string,
    amount: ethers.BigNumberish,
    wallet: ethers.Wallet
) => {
    try {
        const allowance = await tokenContract.allowance(wallet.address, spenderAddress);
        
        if (allowance < amount) {
            console.log("Insufficient allowance. Approving tokens...");
            const approveTx = await tokenContract.approve(spenderAddress, amount);
            await approveTx.wait();
            console.log("Token approval confirmed");
        } else {
            console.log("Sufficient allowance already exists");
        }
    } catch (error) {
        console.error("Error in checkAndApproveToken:", error);
        throw error;
    }
};

const getTokenBalance = async (
    tokenContract: ethers.Contract,
    address: string
) => {
    try {
        return await tokenContract.balanceOf(address);
    } catch (error) {
        console.error("Error getting token balance:", error);
        throw error;
    }
};


const main = async () => {
    try {
        // Check for required environment variables
        if (!process.env.RPC_URL || !process.env.PRIVATE_KEY) {
            throw new Error("Please set RPC_URL and PRIVATE_KEY environment variables");
        }

        console.log("Initializing Uniswap V2 Bot...");
        
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);

        console.log(`Wallet address: ${wallet.address}`);

        // Initialize contracts
        const routerV2Contract = new ethers.Contract(CONTRACT_ADDRESS, routerV2ABI, wallet);
        const usdcContract = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, wallet);
        const wethContract = new ethers.Contract(WETH_ADDRESS, ERC20_ABI, wallet);

        // Get current balances
        const usdcBalance = await getTokenBalance(usdcContract, wallet.address);
        const wethBalance = await getTokenBalance(wethContract, wallet.address);
        const ethBalance = await provider.getBalance(wallet.address);

        console.log("\n--- Current Balances ---");
        console.log(`ETH Balance: ${ethers.formatEther(ethBalance)} ETH`);
        console.log(`USDC Balance: ${ethers.formatUnits(usdcBalance, 6)} USDC`);
        console.log(`WETH Balance: ${ethers.formatUnits(wethBalance, 18)} WETH`);

        // Get price information
        console.log("\n--- Price Information ---");
        
        // Get amount of WETH for 100 USDC
        const amount_out = await getAmountOut(routerV2Contract, ethers.parseUnits("100", 6));
        console.log(`100 USDC → ${ethers.formatUnits(amount_out[1], 18)} WETH`);
        
        // Get amount of USDC needed for 1 WETH
        const amount_in = await getAmountIn(routerV2Contract, ethers.parseUnits("1", 18));
        console.log(`${ethers.formatUnits(amount_in[0], 18)} WETH → 1 USDC (${ethers.formatUnits(amount_in[1], 6)} USDC needed)`);

        // Calculate price ratios
        const usdcPerWeth = (Number(ethers.formatUnits(amount_in[1], 6)) / Number(ethers.formatUnits(amount_in[0], 18))).toFixed(2);
        const wethPerUsdc = (Number(ethers.formatUnits(amount_out[1], 18)) / 100).toFixed(6);
        
        console.log(`Current Price: 1 WETH = ${usdcPerWeth} USDC`);
        console.log(`Current Price: 1 USDC = ${wethPerUsdc} WETH`);

        // Example: Perform a swap if you have enough balance (uncomment to execute)
        /*
        const swapAmount = ethers.parseUnits("10", 6); // 10 USDC
        if (usdcBalance >= swapAmount) {
            console.log("\n--- Executing Swap ---");
            await checkAndApproveToken(usdcContract, CONTRACT_ADDRESS, swapAmount, wallet);
            const receipt = await swapTokenBaseForQuote(routerV2Contract, swapAmount, 0.5, wallet.address); // 0.5% slippage
            console.log("Swap completed successfully!");
        } else {
            console.log("\nInsufficient USDC balance for swap example");
        }
        */

        console.log("\nBot execution completed successfully!");

    } catch (error) {
        console.error("Error in main function:", error);
        process.exit(1);
    }
};

// Run the bot
main();



