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
      .connect(add2)
      .setApprovalForAll(deployedExchangeContract.address, true);

    expect(
      await deployedExchangeContract
        .connect(add2)
        .buyToken(
          deployedCollectivleContract.address,
          4,
          add1.address,
          1000000000000000,
          {
            value: 1000000000000000,
          }
        )
    )
      .to.emit(deployedExchangeContract, "Transfer")
      .withArgs(add2.address, add1.address, 4);
  });

  it("should give owner of the token", async () => {
    owner1 = await deployedCollectivleContract.ownerOf(1);
    owner2 = await deployedCollectivleContract.ownerOf(4);
    console.log("owner of 1:", owner1);
    console.log("owner of 4:", owner2);
  });
});
