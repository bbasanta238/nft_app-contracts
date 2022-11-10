// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CollectiblesData {
    struct tokenInfo {
        uint256 tokenID;
        string tokenURI;
        address currentOwner;
    }

    // struct array for returning data
    tokenInfo[] internal tokenInfoArray;
}
