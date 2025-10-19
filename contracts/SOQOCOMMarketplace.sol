// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title SOQOCOMMarketplace
 * @dev Marketplace pour tokens éthiques - Finance Éthique 3.0
 * Scoring éthique intégré, frais réduits avec SQCM
 */
contract SOQOCOMMarketplace is Ownable, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;

    IERC20 public sqcmToken;

    struct TokenListing {
        address tokenAddress;
        string name;
        string symbol;
        uint256 ethicalScore;
        bool isVerified;
        bool isActive;
        uint256 listingDate;
        string category;
    }

    struct Trade {
        address seller;
        address buyer;
        address tokenAddress;
        uint256 amount;
        uint256 price;
        uint256 timestamp;
        bool completed;
    }

    mapping(address => TokenListing) public listings;
    mapping(uint256 => Trade) public trades;

    address[] public listedTokens;
    uint256 public tradeCounter;

    uint256 public baseFee = 250;
    uint256 public sqcmDiscountFee = 150;
    uint256 public constant FEE_DENOMINATOR = 10000;

    uint256 public minimumEthicalScore = 70;

    event TokenListed(
        address indexed tokenAddress,
        string name,
        uint256 ethicalScore,
        uint256 timestamp
    );
    event TokenDelisted(address indexed tokenAddress, uint256 timestamp);
    event EthicalScoreUpdated(address indexed tokenAddress, uint256 newScore);
    event TradeCreated(uint256 indexed tradeId, address seller, address token, uint256 amount);
    event TradeCompleted(uint256 indexed tradeId, address buyer, uint256 price);
    event FeeUpdated(uint256 baseFee, uint256 sqcmDiscountFee);

    constructor(address _sqcmToken) {
        sqcmToken = IERC20(_sqcmToken);
    }

    function listToken(
        address tokenAddress,
        string memory name,
        string memory symbol,
        uint256 ethicalScore,
        string memory category
    ) external onlyOwner {
        require(tokenAddress != address(0), "Invalid token address");
        require(ethicalScore >= minimumEthicalScore, "Score below minimum");
        require(!listings[tokenAddress].isActive, "Token already listed");

        listings[tokenAddress] = TokenListing({
            tokenAddress: tokenAddress,
            name: name,
            symbol: symbol,
            ethicalScore: ethicalScore,
            isVerified: true,
            isActive: true,
            listingDate: block.timestamp,
            category: category
        });

        listedTokens.push(tokenAddress);

        emit TokenListed(tokenAddress, name, ethicalScore, block.timestamp);
    }

    function delistToken(address tokenAddress) external onlyOwner {
        require(listings[tokenAddress].isActive, "Token not listed");

        listings[tokenAddress].isActive = false;

        emit TokenDelisted(tokenAddress, block.timestamp);
    }

    function updateEthicalScore(address tokenAddress, uint256 newScore) external onlyOwner {
        require(listings[tokenAddress].isActive, "Token not listed");
        require(newScore >= minimumEthicalScore, "Score below minimum");

        listings[tokenAddress].ethicalScore = newScore;

        emit EthicalScoreUpdated(tokenAddress, newScore);
    }

    function createTrade(
        address tokenAddress,
        uint256 amount,
        uint256 pricePerToken
    ) external nonReentrant whenNotPaused returns (uint256) {
        require(listings[tokenAddress].isActive, "Token not listed");
        require(amount > 0, "Amount must be > 0");

        IERC20(tokenAddress).safeTransferFrom(msg.sender, address(this), amount);

        trades[tradeCounter] = Trade({
            seller: msg.sender,
            buyer: address(0),
            tokenAddress: tokenAddress,
            amount: amount,
            price: pricePerToken,
            timestamp: block.timestamp,
            completed: false
        });

        emit TradeCreated(tradeCounter, msg.sender, tokenAddress, amount);

        tradeCounter++;
        return tradeCounter - 1;
    }

    function executeTrade(uint256 tradeId, bool useSQCM) external payable nonReentrant whenNotPaused {
        Trade storage trade = trades[tradeId];
        require(!trade.completed, "Trade already completed");
        require(msg.sender != trade.seller, "Cannot buy own trade");

        uint256 totalPrice = trade.amount * trade.price;
        require(msg.value >= totalPrice, "Insufficient payment");

        uint256 fee = useSQCM ? sqcmDiscountFee : baseFee;
        uint256 feeAmount = (totalPrice * fee) / FEE_DENOMINATOR;
        uint256 sellerAmount = totalPrice - feeAmount;

        if (useSQCM) {
            uint256 sqcmRequired = 100 * 10**18;
            require(sqcmToken.balanceOf(msg.sender) >= sqcmRequired, "Insufficient SQCM for discount");
        }

        trade.buyer = msg.sender;
        trade.completed = true;

        IERC20(trade.tokenAddress).safeTransfer(msg.sender, trade.amount);

        payable(trade.seller).transfer(sellerAmount);

        if (msg.value > totalPrice) {
            payable(msg.sender).transfer(msg.value - totalPrice);
        }

        emit TradeCompleted(tradeId, msg.sender, totalPrice);
    }

    function getListedTokens() external view returns (address[] memory) {
        return listedTokens;
    }

    function getTokenListing(address tokenAddress) external view returns (TokenListing memory) {
        return listings[tokenAddress];
    }

    function updateFees(uint256 newBaseFee, uint256 newSqcmFee) external onlyOwner {
        require(newBaseFee <= 500, "Base fee too high");
        require(newSqcmFee <= 500, "SQCM fee too high");

        baseFee = newBaseFee;
        sqcmDiscountFee = newSqcmFee;

        emit FeeUpdated(newBaseFee, newSqcmFee);
    }

    function setMinimumEthicalScore(uint256 newMinimum) external onlyOwner {
        require(newMinimum <= 100, "Score must be <= 100");
        minimumEthicalScore = newMinimum;
    }

    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
