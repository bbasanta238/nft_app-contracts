const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT main get all token method test", () => {
  beforeEach(async () => {
    [add1, add2, add3] = await ethers.getSigners();
    collectivleContract = await ethers.getContractFactory("Collectibles");
    exchangeContract = await ethers.getContractFactory("Exchange");
    deployedCollectivleContract = await collectivleContract.deploy(
      "NFToken",
      "NTk"
    );
    deployedExchangeContract = await exchangeContract.deploy();
    await deployedCollectivleContract.connect(add1).safeMint("NFT_1");
    await deployedCollectivleContract.connect(add1).safeMint("NFT_2");
    await deployedCollectivleContract.connect(add1).safeMint("NFT_3");
    await deployedCollectivleContract.connect(add2).safeMint("NFT_4");
    await deployedCollectivleContract.connect(add2).safeMint("NFT_5");
  });
  it("should transfer token to the transferred account and balance to the seller account", async () => {
    await deployedCollectivleContract
      .connect(add1)
      .setApprovalForAll(deployedExchangeContract.address, true);

    // await deployedCollectivleContract.connect(add1).getApproved(1);
    owner1 = await deployedCollectivleContract.ownerOf(1);
    await deployedExchangeContract
      .connect(add2)
      .buyToken(
        deployedCollectivleContract.address,
        3,
        add2.address,
        1000000000000000,
        {
          value: 1000000000000000,
        }
      );
    owner2 = await deployedCollectivleContract.ownerOf(1);
    console.log("owner of 1 before transfer:", owner1);
    console.log("owner of 1 after transfer:", owner2);
  });

  it("should give owner of the token", async () => {
    owner1 = await deployedCollectivleContract.ownerOf(1);
    owner2 = await deployedCollectivleContract.ownerOf(4);
    console.log("owner of 1:", owner1);
    console.log("owner of 4:", owner2);
  });
});
