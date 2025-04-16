// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/GuessTheNumber.sol";

contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();
        new GuessTheNumber();
        vm.stopBroadcast();
    }
}
