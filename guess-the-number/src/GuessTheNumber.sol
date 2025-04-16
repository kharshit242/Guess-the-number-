// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract GuessTheNumber {
    event GameResult(address player, uint256 guess, uint256 random, bool win);

    function play(uint256 guess) public returns (bool) {
        require(guess >= 0 && guess <= 100, "Guess between 0-100");

        uint256 random = (uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 100) + 1;

        bool win = (guess == random);
        emit GameResult(msg.sender, guess, random, win);
        return win;
    }
}
