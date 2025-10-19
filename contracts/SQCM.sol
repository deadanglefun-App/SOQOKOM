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

    struct VestingSchedule {
        uint256 totalAmount;
        uint256 releaseTime;
        uint256 claimed;
        bool active;
    }

    mapping(address => VestingSchedule) public vestingSchedules;

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
        require(!vestingSchedules[beneficiary].active, "Vesting already exists");

        vestingSchedules[beneficiary] = VestingSchedule({
            totalAmount: amount,
            releaseTime: releaseTime,
            claimed: 0,
            active: true
        });

        _transfer(msg.sender, address(this), amount);

        emit VestingScheduled(beneficiary, amount, releaseTime);
    }

    function claimVesting() public {
        VestingSchedule storage vesting = vestingSchedules[msg.sender];
        require(vesting.active, "No vesting schedule");
        require(block.timestamp >= vesting.releaseTime, "Vesting not yet released");

        uint256 claimableAmount = vesting.totalAmount - vesting.claimed;
        require(claimableAmount > 0, "No tokens to claim");

        vesting.claimed = vesting.totalAmount;
        _transfer(address(this), msg.sender, claimableAmount);

        emit VestingClaimed(msg.sender, claimableAmount);
    }

    function _update(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        require(!isBlacklisted[from], "Sender blacklisted");
        require(!isBlacklisted[to], "Recipient blacklisted");
        super._update(from, to, amount);
    }
}
