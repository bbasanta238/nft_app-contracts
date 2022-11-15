// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Collectibles.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Exchange {
    // modifier to check if the signed address belongs to that token id 
    modifier isSignerOwner(address _signer,address _contractAddress,uint _tokenId){
        require(ERC721(_contractAddress).ownerOf(_tokenId)==_signer,"Invalid signature");
        _;
    }

    //function to transfer tokens
    function buyToken(
        address contractAddress,
        uint256 tokenId,
        address to,
        uint256 amount,
        address signer
    ) public payable isSignerOwner(signer,contractAddress,tokenId) {
        (bool sentToSeller, ) = payable(
            ERC721(contractAddress).ownerOf(tokenId)
        ).call{value: amount}("");
        ERC721(contractAddress).safeTransferFrom(
            ERC721(contractAddress).ownerOf(tokenId),
            to,
            tokenId
        );
    }
    
    // frunction to verify singature
    function verifySignature(string memory message, bytes memory signature) public pure returns(address) {
       return ECDSA.recover(keccak256(abi.encodePacked(message)),signature);
    }


}
