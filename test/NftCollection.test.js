const { expect } = require("chai");
const hre = require("hardhat");

describe("NftCollection", function () {
  let nft, owner, addr1, addr2;

  beforeEach(async () => {
    const signers = await hre.ethers.getSigners();
    owner = signers[0];
    addr1 = signers[1];
    addr2 = signers[2];

    const NFT = await hre.ethers.getContractFactory("NftCollection");
    nft = await NFT.deploy("MyNFT", "MNFT", 5, "https://example.com/");
    await nft.waitForDeployment();
  });

  it("Should have correct name and symbol", async () => {
    expect(await nft.name()).to.equal("MyNFT");
    expect(await nft.symbol()).to.equal("MNFT");
  });

  it("Owner should mint successfully", async () => {
    await nft.mint(owner.address, 1);
    expect(await nft.ownerOf(1)).to.equal(owner.address);
  });

  it("Should reject minting beyond max supply", async () => {
    for (let i = 1; i <= 5; i++) {
      await nft.mint(owner.address, i);
    }
    await expect(nft.mint(owner.address, 6)).to.be.revertedWith("Max supply reached");
  });

  it("Should pause and unpause minting", async () => {
    await nft.pauseMint(true);
    await expect(nft.mint(owner.address, 1)).to.be.revertedWith("Minting paused");

    await nft.pauseMint(false);
    await nft.mint(owner.address, 1);
    expect(await nft.ownerOf(1)).to.equal(owner.address);
  });

  it("Should allow transfers", async () => {
    await nft.mint(owner.address, 1);
    await nft.transferFrom(owner.address, addr1.address, 1);
    expect(await nft.ownerOf(1)).to.equal(addr1.address);
  });

  it("Should emit Transfer event on mint", async () => {
    await expect(nft.mint(owner.address, 1))
      .to.emit(nft, "Transfer")
      .withArgs(hre.ethers.ZeroAddress, owner.address, 1);
  });

  it("Should reject minting to zero address", async () => {
    await expect(nft.mint(hre.ethers.ZeroAddress, 1)).to.be.revertedWith(
      "Cannot mint to zero address"
    );
  });

  it("Should prevent minting an already minted tokenId", async () => {
    await nft.mint(owner.address, 1);
    await expect(nft.mint(owner.address, 1)).to.be.revertedWith("Token already minted");
  });
});
