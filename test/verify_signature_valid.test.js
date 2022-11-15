const { expect } = require("chai");
const { ethers } = require("hardhat");
const EthCrypto = require("eth-crypto");

describe("NFT main get all token method test", () => {
  beforeEach(async () => {
    [add1, add2, add3] = await ethers.getSigners();
    privateKey1 =
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    privateKey2 =
      "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
    collectivleContract = await ethers.getContractFactory("Collectibles");
    exchangeContract = await ethers.getContractFactory("Exchange");
    deployedCollectivleContract = await collectivleContract.deploy();
    deployedExchangeContract = await exchangeContract.deploy();
    await deployedCollectivleContract.connect(add1).safeMint("NFT_1");
    await deployedCollectivleContract.connect(add2).safeMint("NFT_2");
    obj = { tokenId: 1, price: 20000, message: "Verify signature" };
    message = JSON.stringify(obj);
  });

  it("should accept the verification", async () => {
    const hashedMessage = await EthCrypto.hash.keccak256(message);
    const signedMessage = await EthCrypto.sign(privateKey1, hashedMessage);
    await deployedExchangeContract
      .connect(add1)
      .verifySignature(
        message,
        signedMessage,
        deployedCollectivleContract.address,
        1
      );
  });
});
