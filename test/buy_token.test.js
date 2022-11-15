const { expect } = require("chai");
const { ethers } = require("hardhat");
const EthCrypto = require("eth-crypto");

describe("buy token method test", () => {
  beforeEach(async () => {
    [add1, add2, add3] = await ethers.getSigners();
    collectivleContract = await ethers.getContractFactory("Collectibles");
    exchangeContract = await ethers.getContractFactory("Exchange");
    deployedCollectivleContract = await collectivleContract.deploy();
    deployedExchangeContract = await exchangeContract.deploy();
    await deployedCollectivleContract.connect(add1).safeMint("NFT_1");
    privateKey1 =
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    privateKey2 =
      "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
    obj = { tokenId: 1, price: 1000000000000000, message: "Verify signature" };
    message = JSON.stringify(obj);
  });

  it("should transfer token to the transferred account and balance to the seller account", async () => {
    await deployedCollectivleContract
      .connect(add1)
      .setApprovalForAll(deployedExchangeContract.address, true);
    const hashedMessage = await EthCrypto.hash.keccak256(message);
    const signedMessage = await EthCrypto.sign(privateKey1, hashedMessage);

    expect(
      await deployedExchangeContract
        .connect(add2)
        .buyToken(
          deployedCollectivleContract.address,
          1,
          add1.address,
          1000000000000000,
          message,
          signedMessage,
          {
            value: 1000000000000000,
          }
        )
    )
      .to.emit(deployedExchangeContract, "Transfer")
      .withArgs(add2.address, add1.address, 1);
  });

  it("should revert transaction with reason invalid signature when message is chaged", async () => {
    await deployedCollectivleContract
      .connect(add1)
      .setApprovalForAll(deployedExchangeContract.address, true);
    const hashedMessage = await EthCrypto.hash.keccak256(message);
    const signedMessage = await EthCrypto.sign(privateKey1, hashedMessage);
    modifiedObj = {
      tokenId: 1,
      price: 1000000000000,
      message: "Verify signature",
    };
    modifiedMessage = JSON.stringify(modifiedObj);
    await expect(
      deployedExchangeContract
        .connect(add2)
        .buyToken(
          deployedCollectivleContract.address,
          1,
          add2.address,
          1000000000000000,
          modifiedMessage,
          signedMessage,
          {
            value: 1000000000000000,
          }
        )
    ).to.be.revertedWith("Invalid signature");
  });

  it("should give owner of the token", async () => {
    expect(await deployedCollectivleContract.ownerOf(1)).to.equal(add1.address);
  });
});
