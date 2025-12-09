// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NftCollection is ERC721, Ownable {
    uint256 public maxSupply;
    uint256 public totalSupply;
    string private baseTokenURI;
    bool public mintPaused = false;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _maxSupply,
        string memory _baseTokenURI
    ) ERC721(_name, _symbol) Ownable(msg.sender) {
        maxSupply = _maxSupply;
        baseTokenURI = _baseTokenURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory newURI) external onlyOwner {
        baseTokenURI = newURI;
    }

    function pauseMint(bool _state) external onlyOwner {
        mintPaused = _state;
    }

    function mint(address to, uint256 tokenId) external onlyOwner {
        require(!mintPaused, "Minting paused");
        require(totalSupply < maxSupply, "Max supply reached");
        require(_ownerOf(tokenId) == address(0), "Token already minted");
        require(to != address(0), "Cannot mint to zero address");

        _safeMint(to, tokenId);
        totalSupply++;
    }
}
