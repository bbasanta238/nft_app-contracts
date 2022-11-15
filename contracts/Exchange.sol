// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Collectibles.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Exchange {
    //function to transfer tokens
    function buyToken(
        address contractAddress,
        uint256 tokenId,
        address to,
        uint256 amount,
        string memory message,
        bytes memory signature
    ) public payable {
        verifySignature(message, signature, contractAddress, tokenId);
        address currentOwner = ERC721(contractAddress).ownerOf(tokenId);
        payable(currentOwner).transfer(amount);
        ERC721(contractAddress).safeTransferFrom(currentOwner, to, tokenId);
    }

    // function to verify singature
    function verifySignature(
        string memory message,
        bytes memory signature,
        address contractAddress,
        uint256 tokenId
    ) public view {
        address signer = ECDSA.recover(
            keccak256(abi.encodePacked(message)),
            signature
        );
        require(
            ERC721(contractAddress).ownerOf(tokenId) == signer,
            "Invalid signature"
        );
    }
}
