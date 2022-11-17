const hre = require("hardhat");
var fs = require("fs");

async function main() {
  const contract = await hre.ethers.getContractFactory("Exchange");
  const contractInstance = await contract.deploy();
  await contractInstance.deployed();
  // deployed address
  console.log(`deployed address: ${contractInstance.address}`);
  // deployed address written in .env file
  deployedAddress = `DEPLOYED_Exchange_CONTRACT_ADDRESS="${contractInstance.address}"`;
  fs.appendFileSync(".env", deployedAddress + "\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
