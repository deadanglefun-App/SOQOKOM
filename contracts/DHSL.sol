// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title DHSL Stablecoin
 * @dev Stablecoin adossé à l'argent physique (1 DHSL = 1g argent)
 * Whitepaper v2.0 - Finance Éthique 3.0
 */
contract DHSL is ERC20, ERC20Burnable, AccessControl, Pausable, ReentrancyGuard {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");

    uint256 public silverPriceUSD;
    uint256 public lastPriceUpdate;
    uint256 public constant PRICE_VALIDITY = 1 hours;

    uint256 public totalSilverBacked;

    mapping(address => bool) public isVerified;

    event SilverPriceUpdated(uint256 newPrice, uint256 timestamp);
    event SilverBacked(uint256 amount, uint256 timestamp);
    event UserVerified(address indexed user);
    event UserUnverified(address indexed user);
    event Minted(address indexed to, uint256 amount, uint256 silverAmount);
    event Redeemed(address indexed from, uint256 amount, uint256 silverAmount);

    constructor() ERC20("DHSL Stablecoin", "DHSL") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(BURNER_ROLE, msg.sender);
        _grantRole(ORACLE_ROLE, msg.sender);
    }

    function updateSilverPrice(uint256 priceInUSD) public onlyRole(ORACLE_ROLE) {
        silverPriceUSD = priceInUSD;
        lastPriceUpdate = block.timestamp;
        emit SilverPriceUpdated(priceInUSD, block.timestamp);
    }

    function getSilverPriceUSD() public view returns (uint256) {
        require(block.timestamp - lastPriceUpdate <= PRICE_VALIDITY, "Price outdated");
        return silverPriceUSD;
    }

    function verifyUser(address user) public onlyRole(DEFAULT_ADMIN_ROLE) {
        isVerified[user] = true;
        emit UserVerified(user);
    }

    function unverifyUser(address user) public onlyRole(DEFAULT_ADMIN_ROLE) {
        isVerified[user] = false;
        emit UserUnverified(user);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) whenNotPaused {
        require(isVerified[to], "User not KYC verified");

        totalSilverBacked += amount;

        _mint(to, amount);

        emit Minted(to, amount, amount / 1e18);
    }

    function redeem(uint256 amount) public nonReentrant whenNotPaused {
        require(isVerified[msg.sender], "User not KYC verified");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        totalSilverBacked -= amount;

        _burn(msg.sender, amount);

        emit Redeemed(msg.sender, amount, amount / 1e18);
    }

    function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        if (from != address(0) && to != address(0)) {
            require(isVerified[from], "Sender not verified");
            require(isVerified[to], "Recipient not verified");
        }
        super._beforeTokenTransfer(from, to, amount);
    }
}
