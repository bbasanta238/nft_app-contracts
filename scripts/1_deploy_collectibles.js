const hre = require("hardhat");
var fs = require("fs");

async function main() {
  const contract = await hre.ethers.getContractFactory("Collectibles");
  const contractInstance = await contract.deploy();
  await contractInstance.deployed();
  // deployed address
  console.log(`deployed to address (NFT main) :  ${contractInstance.address}`);
  // deployed address written in .env file
  var dataArray = fs.readFileSync(".env", "utf8").split("\n");
  dataArray[0] = `DEPLOYED_Collectibles_CONTRACT_ADDRESS="${contractInstance.address}"`;
  fs.writeFileSync(".env", "");
  for (let i = 0; i < dataArray.length; i++) {
    fs.appendFileSync(".env", dataArray[i] + "\n");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
