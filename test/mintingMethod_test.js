const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT main minting and URI test", () => {
  beforeEach(async () => {
    [add1, add2, add3] = await ethers.getSigners();
    contract = await ethers.getContractFactory("NFTMain");
    deployedContract = await contract.deploy();
  });
  it("should have mint token", async () => {
    await deployedContract.connect(add1).safeMint("NFT_1");
    expect(await deployedContract.connect(add1).ownerOf(1)).to.equal(
      add1.address
    );
    console.log(
      "token in the addres should be 1000000",
      await deployedContract.connect(add1).ownerOf(1)
    );
  });

  it("should emit an Transfer event", async () => {
    await expect(deployedContract.connect(add1).safeMint("NFT_1"))
      .to.emit(deployedContract, "Transfer")
      .withArgs(ethers.constants.AddressZero, add1.address, 1);
  });

  it("should have give the uri of metadata", async () => {
    await deployedContract.connect(add2).safeMint("NFT_1");
    expect(await deployedContract.connect(add1).tokenURI(1)).to.equal("NFT_1");
  });
});
