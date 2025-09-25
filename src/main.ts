import { ethers } from "ethers";

import routerV2ABI from "../abi/routerV2.json";

const CONTRACT_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

const swapTokenBaseForQuote = async (
    routerV2Contract: ethers.Contract,
    amountIn: ethers.BigNumberish,
    slippage: number,
    recipient: string
) => {
    const amountOutMin = 0; // Set your minimum amount out
    const path = [USDC_ADDRESS, WETH_ADDRESS];
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now

    const tx = await routerV2Contract.swapExactTokensForTokens(
        amountIn,
        amountOutMin,
        path,
        recipient,
        deadline
    );

    return tx;
};


const getAmountOut = async (
    routerV2Contract: ethers.Contract,
    amountIn: ethers.BigNumberish
) => {
    const path = [USDC_ADDRESS, WETH_ADDRESS];
    const amountsOut = await routerV2Contract.getAmountsOut(amountIn, path);
    return amountsOut;
};


const getAmountIn = async (
    routerV2Contract: ethers.Contract,
    amountOut: ethers.BigNumberish
) => {
    const path = [WETH_ADDRESS, USDC_ADDRESS];
    const amountsIn = await routerV2Contract.getAmountsIn(amountOut, path);
    return amountsIn;
};


const main = async () => {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);

    const routerV2Contract = new ethers.Contract(CONTRACT_ADDRESS, routerV2ABI, wallet);

    const amount_out = await getAmountOut(routerV2Contract, ethers.parseUnits("100", 6));

    const amount_in = await getAmountIn(routerV2Contract, ethers.parseUnits("1", 18));

    console.log("Amount Out (WETH) for 100 USDC:", ethers.formatUnits(amount_out[1], 18));

}



// POOL BALANCE
// USDC = 1000
// WETH = 10

// Constant product formula: x * y = k

// k = USDC * WETH = 1000 * 10 = 10000

// USDC = K/WETH = 10000/10 = 1000 USDC
// WETH = K/USDC = 10000/1000 = 10 WETH

// BASE/QUOTE = USDC/WETH = 1000/10 = 100 USD


// WALLET -> USDC -> CONTRACT - > WETH -> WALLET
// 100 USDC - > CONTRACT  -> 1 WETH -> WALLET
