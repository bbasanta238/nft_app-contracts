// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import './Collectibles.sol';

contract Exchange{
     //function to transfer tokens
    function buyToken(address _contractAddress,uint tokenId, address to, uint amount) public payable{
        (bool sentToSeller, ) = payable(ERC721(_contractAddress).ownerOf(tokenId)).call{value: amount}("");
        ERC721(_contractAddress).safeTransferFrom(ERC721(_contractAddress).ownerOf(tokenId), to, tokenId);
    } 
}