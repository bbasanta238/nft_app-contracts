// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract NFTDataStruct {
    struct tokenInfo {
        uint256 tokenID;
        string tokenURI;
    }

    // struct array for returning data
    tokenInfo[] internal tokenInfoArray;
}