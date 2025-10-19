// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title SQCM Token
 * @dev Token principal SOQOCOM - Finance Éthique 3.0
 * Supply: 500,000,000 SQCM
 * Whitepaper v2.0
 */
contract SQCM is ERC20, ERC20Burnable, ERC20Permit, Ownable, Pausable {
    uint256 public constant MAX_SUPPLY = 500_000_000 * 10**18;

    mapping(address => bool) public isBlacklisted;
    mapping(address => uint256) public vestingSchedule;
    mapping(address => uint256) public vestingClaimed;

    event Blacklisted(address indexed account);
    event Unblacklisted(address indexed account);
    event VestingScheduled(address indexed beneficiary, uint256 amount, uint256 releaseTime);
    event VestingClaimed(address indexed beneficiary, uint256 amount);

    constructor() ERC20("SOQOCOM Token", "SQCM") ERC20Permit("SOQOCOM Token") {
        _mint(msg.sender, MAX_SUPPLY);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function blacklist(address account) public onlyOwner {
        isBlacklisted[account] = true;
        emit Blacklisted(account);
    }

    function unblacklist(address account) public onlyOwner {
        isBlacklisted[account] = false;
        emit Unblacklisted(account);
    }

    function scheduleVesting(
        address beneficiary,
        uint256 amount,
        uint256 releaseTime
    ) public onlyOwner {
        require(beneficiary != address(0), "Invalid beneficiary");
        require(amount > 0, "Amount must be > 0");
        require(releaseTime > block.timestamp, "Release time must be future");

        vestingSchedule[beneficiary] = releaseTime;

        _transfer(msg.sender, address(this), amount);

        emit VestingScheduled(beneficiary, amount, releaseTime);
    }

    function claimVesting() public {
        require(vestingSchedule[msg.sender] > 0, "No vesting schedule");
        require(block.timestamp >= vestingSchedule[msg.sender], "Vesting not yet released");

        uint256 amount = balanceOf(address(this));
        require(amount > 0, "No tokens to claim");

        vestingClaimed[msg.sender] += amount;
        _transfer(address(this), msg.sender, amount);

        emit VestingClaimed(msg.sender, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        require(!isBlacklisted[from], "Sender blacklisted");
        require(!isBlacklisted[to], "Recipient blacklisted");
        super._beforeTokenTransfer(from, to, amount);
    }
}
