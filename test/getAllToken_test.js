const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT main get all token method test", () => {
  beforeEach(async () => {
    [add1, add2, add3] = await ethers.getSigners();
    contract = await ethers.getContractFactory("NFTMain");
    deployedContract = await contract.deploy();
    await deployedContract.connect(add1).safeMint("NFT_1");
    await deployedContract.connect(add1).safeMint("NFT_2");
    await deployedContract.connect(add1).safeMint("NFT_3");
    await deployedContract.connect(add1).safeMint("NFT_4");
  });
  it("should retun an array of all nft with struct token ID and token URI", async () => {
    console.log("*************** Array of Data ****************");
    console.log(await deployedContract.connect(add1).getAllTokens());
  });
});
