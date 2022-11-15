const { expect } = require("chai");
const { ethers } = require("hardhat");
const EthCrypto = require("eth-crypto");

describe("NFT main get all token method test", () => {
  beforeEach(async () => {
    [add1, add2, add3] = await ethers.getSigners();
    collectivleContract = await ethers.getContractFactory("Collectibles");
    exchangeContract = await ethers.getContractFactory("Exchange");
    deployedCollectivleContract = await collectivleContract.deploy();
    deployedExchangeContract = await exchangeContract.deploy();
    obj = { tokenId: 1, price: 20000, message: "Verify signature" };
    message = JSON.stringify(obj);
    signerIdentity = EthCrypto.createIdentity();
  });

  it("should return a signed message", async () => {
    const hashedMessage = await EthCrypto.hash.keccak256(message);
    const signedMessage = await EthCrypto.sign(
      signerIdentity.privateKey,
      hashedMessage
    );
    console.log(signedMessage);
  });

  it("should return the signed address", async () => {
    const hashedMessage = await EthCrypto.hash.keccak256(message);
    const signedMessage = await EthCrypto.sign(
      signerIdentity.privateKey,
      hashedMessage
    );
    expect(
      await deployedExchangeContract
        .connect(add1)
        .verifySignature(message, signedMessage)
    ).to.equal(signerIdentity.address);
  });
});
