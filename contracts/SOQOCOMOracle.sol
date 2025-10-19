// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title SOQOCOMOracle
 * @dev Oracle décentralisé pour scoring éthique - Finance Éthique 3.0
 * Agrégation de données ESG, conformité, transparence
 */
contract SOQOCOMOracle is AccessControl, Pausable {
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");
    bytes32 public constant VALIDATOR_ROLE = keccak256("VALIDATOR_ROLE");

    struct EthicalScore {
        uint256 environmentScore;
        uint256 socialScore;
        uint256 governanceScore;
        uint256 transparencyScore;
        uint256 complianceScore;
        uint256 overallScore;
        uint256 lastUpdate;
        uint256 validatorCount;
        bool isActive;
    }

    struct DataSource {
        string name;
        address provider;
        uint256 weight;
        bool isActive;
    }

    mapping(address => EthicalScore) public tokenScores;
    mapping(address => DataSource[]) public tokenDataSources;
    mapping(address => mapping(address => bool)) public validatorVotes;

    address[] public scoredTokens;

    uint256 public minimumValidators = 3;
    uint256 public scoreValidityPeriod = 30 days;

    event ScoreUpdated(
        address indexed token,
        uint256 overallScore,
        uint256 timestamp
    );
    event DataSourceAdded(address indexed token, string name, address provider);
    event ValidatorVoted(address indexed token, address indexed validator);
    event ScoreValidated(address indexed token, uint256 validatorCount);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ORACLE_ROLE, msg.sender);
        _grantRole(VALIDATOR_ROLE, msg.sender);
    }

    function submitScore(
        address token,
        uint256 environmentScore,
        uint256 socialScore,
        uint256 governanceScore,
        uint256 transparencyScore,
        uint256 complianceScore
    ) external onlyRole(ORACLE_ROLE) whenNotPaused {
        require(token != address(0), "Invalid token");
        require(
            environmentScore <= 100 &&
            socialScore <= 100 &&
            governanceScore <= 100 &&
            transparencyScore <= 100 &&
            complianceScore <= 100,
            "Scores must be <= 100"
        );

        uint256 overallScore = (
            environmentScore * 25 +
            socialScore * 20 +
            governanceScore * 25 +
            transparencyScore * 15 +
            complianceScore * 15
        ) / 100;

        if (!tokenScores[token].isActive) {
            scoredTokens.push(token);
        }

        tokenScores[token] = EthicalScore({
            environmentScore: environmentScore,
            socialScore: socialScore,
            governanceScore: governanceScore,
            transparencyScore: transparencyScore,
            complianceScore: complianceScore,
            overallScore: overallScore,
            lastUpdate: block.timestamp,
            validatorCount: 0,
            isActive: true
        });

        emit ScoreUpdated(token, overallScore, block.timestamp);
    }

    function validateScore(address token) external onlyRole(VALIDATOR_ROLE) {
        require(tokenScores[token].isActive, "Token not scored");
        require(!validatorVotes[token][msg.sender], "Already validated");

        validatorVotes[token][msg.sender] = true;
        tokenScores[token].validatorCount++;

        emit ValidatorVoted(token, msg.sender);

        if (tokenScores[token].validatorCount >= minimumValidators) {
            emit ScoreValidated(token, tokenScores[token].validatorCount);
        }
    }

    function addDataSource(
        address token,
        string memory name,
        address provider,
        uint256 weight
    ) external onlyRole(ORACLE_ROLE) {
        require(token != address(0), "Invalid token");
        require(provider != address(0), "Invalid provider");
        require(weight <= 100, "Weight must be <= 100");

        tokenDataSources[token].push(DataSource({
            name: name,
            provider: provider,
            weight: weight,
            isActive: true
        }));

        emit DataSourceAdded(token, name, provider);
    }

    function getScore(address token) external view returns (
        uint256 overallScore,
        uint256 environmentScore,
        uint256 socialScore,
        uint256 governanceScore,
        uint256 transparencyScore,
        uint256 complianceScore,
        bool isValid
    ) {
        EthicalScore memory score = tokenScores[token];

        bool isValid = score.isActive &&
            score.validatorCount >= minimumValidators &&
            (block.timestamp - score.lastUpdate) <= scoreValidityPeriod;

        return (
            score.overallScore,
            score.environmentScore,
            score.socialScore,
            score.governanceScore,
            score.transparencyScore,
            score.complianceScore,
            isValid
        );
    }

    function getScoredTokens() external view returns (address[] memory) {
        return scoredTokens;
    }

    function setMinimumValidators(uint256 newMinimum) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(newMinimum > 0, "Minimum must be > 0");
        minimumValidators = newMinimum;
    }

    function setScoreValidityPeriod(uint256 newPeriod) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(newPeriod > 0, "Period must be > 0");
        scoreValidityPeriod = newPeriod;
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}
