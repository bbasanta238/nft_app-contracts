const hre = require("hardhat");
var fs = require("fs");

async function main() {
  const contract = await hre.ethers.getContractFactory("Collectibles");
  const contractInstance = await contract.deploy();
  await contractInstance.deployed();
  // deployed address
  console.log(`deployed to address (NFT main) :  ${contractInstance.address}`);
  // deployed address written in .env file
  deployedAddress = `DEPLOYED_Collectibles_CONTRACT_ADDRESS="${contractInstance.address}"`;
  fs.appendFileSync(".env", deployedAddress + "\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
