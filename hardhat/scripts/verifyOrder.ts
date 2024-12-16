import { ethers } from 'ethers';
import { abi } from '../artifacts/contracts/Order.sol/OrderContract.json';
import dotenv from 'dotenv';

dotenv.config();

const privateKey = process.env.SELLER_PRIVATE_KEY || '';
const contractAddress = process.env.ORDER_CONTRACT!;
const provider = new ethers.providers.InfuraProvider(
  'goerli',
  process.env.INFURA_API_KEY!
);

const wallet = new ethers.Wallet(privateKey);
const signer = wallet.connect(provider);

async function verifyOrder(orderId: string) {
  try {
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const order = await contract.getOrder(orderId);
    console.log('Order Details:', order);
  } catch (error) {
    console.error('Error fetching order details:', error);
  }
}

const ORDER_ID = 'ORDER_ID';
verifyOrder(ORDER_ID);
