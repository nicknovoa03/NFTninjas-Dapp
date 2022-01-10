import Web3 from "web3";
import contract from "./contracts/contract.json"


const contractAddr = "";
const web3 = new Web3("https://mainnet.infura.io/v3/bad8cc770bef49dc88683bf2290205c8");
let contract = new web3.eth.Contract(contract.abi, contractAddr);

export { 
    contractAddr, 
    contract
};