// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract NFTDataStruct{
    struct tokenInfo{
        uint tokenID;
        string tokenURI;
    }

    // struct array for returning data
    tokenInfo[] internal tokenInfoArray;
}