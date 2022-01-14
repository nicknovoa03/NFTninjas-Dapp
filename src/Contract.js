import Web3 from "web3";
import contractJson from "./contracts/contract.json"


const contractAddr = "0x54cFE0bDB34556308671d912A377664299236209";
const web3 = new Web3("https://mainnet.infura.io/v3/bad8cc770bef49dc88683bf2290205c8");
let contract = new web3.eth.Contract(contractJson.abi, contractAddr);

export { 
    contractAddr, 
    contract
};