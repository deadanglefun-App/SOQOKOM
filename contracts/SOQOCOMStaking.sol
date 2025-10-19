// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title SOQOCOMStaking
 * @dev Contrat de staking SQCM - Finance Éthique 3.0
 * APY: 8-15% selon durée de lock
 */
contract SOQOCOMStaking is Ownable, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;

    IERC20 public sqcmToken;

    struct StakingPlan {
        string name;
        uint256 duration;
        uint256 apy;
        uint256 minAmount;
        bool active;
    }

    struct Stake {
        uint256 amount;
        uint256 startTime;
        uint256 endTime;
        uint256 planId;
        uint256 rewards;
        bool withdrawn;
    }

    StakingPlan[] public stakingPlans;
    mapping(address => Stake[]) public userStakes;

    uint256 public totalStaked;
    uint256 public totalRewardsPaid;

    event Staked(address indexed user, uint256 amount, uint256 planId, uint256 stakeIndex);
    event Unstaked(address indexed user, uint256 amount, uint256 rewards, uint256 stakeIndex);
    event RewardsClaimed(address indexed user, uint256 rewards, uint256 stakeIndex);
    event PlanAdded(uint256 planId, string name, uint256 duration, uint256 apy);
    event PlanUpdated(uint256 planId, bool active);

    constructor(address _sqcmToken) {
        sqcmToken = IERC20(_sqcmToken);

        stakingPlans.push(StakingPlan({
            name: "Flexible",
            duration: 0,
            apy: 800,
            minAmount: 100 * 10**18,
            active: true
        }));

        stakingPlans.push(StakingPlan({
            name: "Bronze - 3 mois",
            duration: 90 days,
            apy: 1000,
            minAmount: 500 * 10**18,
            active: true
        }));

        stakingPlans.push(StakingPlan({
            name: "Silver - 6 mois",
            duration: 180 days,
            apy: 1200,
            minAmount: 1000 * 10**18,
            active: true
        }));

        stakingPlans.push(StakingPlan({
            name: "Gold - 12 mois",
            duration: 365 days,
            apy: 1500,
            minAmount: 5000 * 10**18,
            active: true
        }));
    }

    function stake(uint256 amount, uint256 planId) external nonReentrant whenNotPaused {
        require(planId < stakingPlans.length, "Invalid plan");
        StakingPlan memory plan = stakingPlans[planId];
        require(plan.active, "Plan not active");
        require(amount >= plan.minAmount, "Amount below minimum");

        sqcmToken.safeTransferFrom(msg.sender, address(this), amount);

        uint256 endTime = plan.duration > 0 ? block.timestamp + plan.duration : 0;

        userStakes[msg.sender].push(Stake({
            amount: amount,
            startTime: block.timestamp,
            endTime: endTime,
            planId: planId,
            rewards: 0,
            withdrawn: false
        }));

        totalStaked += amount;

        emit Staked(msg.sender, amount, planId, userStakes[msg.sender].length - 1);
    }

    function calculateRewards(address user, uint256 stakeIndex) public view returns (uint256) {
        require(stakeIndex < userStakes[user].length, "Invalid stake index");
        Stake memory userStake = userStakes[user][stakeIndex];

        if (userStake.withdrawn) return 0;

        StakingPlan memory plan = stakingPlans[userStake.planId];

        uint256 stakingDuration = block.timestamp - userStake.startTime;

        uint256 rewards = (userStake.amount * plan.apy * stakingDuration) / (365 days * 10000);

        return rewards;
    }

    function unstake(uint256 stakeIndex) external nonReentrant {
        require(stakeIndex < userStakes[msg.sender].length, "Invalid stake index");
        Stake storage userStake = userStakes[msg.sender][stakeIndex];

        require(!userStake.withdrawn, "Already withdrawn");

        if (userStake.endTime > 0) {
            require(block.timestamp >= userStake.endTime, "Lock period not ended");
        }

        uint256 rewards = calculateRewards(msg.sender, stakeIndex);
        uint256 totalAmount = userStake.amount + rewards;

        userStake.rewards = rewards;
        userStake.withdrawn = true;

        totalStaked -= userStake.amount;
        totalRewardsPaid += rewards;

        sqcmToken.safeTransfer(msg.sender, totalAmount);

        emit Unstaked(msg.sender, userStake.amount, rewards, stakeIndex);
    }

    function claimRewards(uint256 stakeIndex) external nonReentrant {
        require(stakeIndex < userStakes[msg.sender].length, "Invalid stake index");
        Stake storage userStake = userStakes[msg.sender][stakeIndex];

        require(!userStake.withdrawn, "Stake already withdrawn");

        uint256 rewards = calculateRewards(msg.sender, stakeIndex);
        require(rewards > 0, "No rewards available");

        userStake.rewards += rewards;
        userStake.startTime = block.timestamp;

        totalRewardsPaid += rewards;

        sqcmToken.safeTransfer(msg.sender, rewards);

        emit RewardsClaimed(msg.sender, rewards, stakeIndex);
    }

    function getUserStakes(address user) external view returns (Stake[] memory) {
        return userStakes[user];
    }

    function addPlan(
        string memory name,
        uint256 duration,
        uint256 apy,
        uint256 minAmount
    ) external onlyOwner {
        stakingPlans.push(StakingPlan({
            name: name,
            duration: duration,
            apy: apy,
            minAmount: minAmount,
            active: true
        }));

        emit PlanAdded(stakingPlans.length - 1, name, duration, apy);
    }

    function updatePlan(uint256 planId, bool active) external onlyOwner {
        require(planId < stakingPlans.length, "Invalid plan");
        stakingPlans[planId].active = active;

        emit PlanUpdated(planId, active);
    }

    function emergencyWithdraw(address token, uint256 amount) external onlyOwner {
        IERC20(token).safeTransfer(msg.sender, amount);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
