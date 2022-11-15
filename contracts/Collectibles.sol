// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Collectibles is ERC721URIStorage {
    struct tokenInfo {
        uint256 tokenID;
        string tokenURI;
        address currentOwner;
    }

    // struct array for returning data
    tokenInfo[] internal tokenInfoArray;

    using Counters for Counters.Counter;

    Counters.Counter internal _tokenIdCounter;

    constructor() ERC721("NFToken", "NTOk") {}

    function safeMint(string memory uri) public {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // method to get all tokens
    function getAllTokens() public view returns (tokenInfo[] memory) {
        tokenInfo[] memory returnDataArray = new tokenInfo[](
            _tokenIdCounter.current()
        );
        for (uint256 i = 0; i < _tokenIdCounter.current(); i++) {
            tokenInfo memory dataStruct = tokenInfo(
                i + 1,
                tokenURI(i + 1),
                ownerOf(i + 1)
            );
            returnDataArray[i] = dataStruct;
        }
        return returnDataArray;
    }
}
