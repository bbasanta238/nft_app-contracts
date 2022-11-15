const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT main get all token method test", () => {
  beforeEach(async () => {
    [add1, add2, add3] = await ethers.getSigners();
    collectivleContract = await ethers.getContractFactory("Collectibles");
    exchangeContract = await ethers.getContractFactory("Exchange");
    deployedCollectivleContract = await collectivleContract.deploy();
    deployedExchangeContract = await exchangeContract.deploy();
    await deployedCollectivleContract.connect(add1).safeMint("NFT_1");
    await deployedCollectivleContract.connect(add1).safeMint("NFT_2");
    await deployedCollectivleContract.connect(add1).safeMint("NFT_3");
    await deployedCollectivleContract.connect(add2).safeMint("NFT_4");
    await deployedCollectivleContract.connect(add2).safeMint("NFT_5");
  });

  it("should give approval for exchange", async () => {
    await deployedCollectivleContract
      .connect(add1)
      .setApprovalForAll(deployedExchangeContract.address, true);
    console.log(
      await deployedCollectivleContract
        .connect(add2)
        .isApprovedForAll(add2.address, deployedExchangeContract.address)
    );
  });
});
