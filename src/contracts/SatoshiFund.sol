// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SatoshiFund {
    IERC20 public rbtc;
    IERC20 public stablecoin;

    struct Loan {
        uint256 principal;
        uint256 collateral;
        uint256 interestAccrued;
        uint256 startDate;
        uint256 collateralizationRatio;
        uint256 interestRatePerDay;
        bool active;
    }

    mapping(address => uint256) public collateralBalances;
    mapping(address => Loan) public loans;

    constructor(IERC20 _rbtc, IERC20 _stablecoin) {
        rbtc = _rbtc;
        stablecoin = _stablecoin;
    }

    function depositCollateral(uint256 amount) external {
        require(amount > 0, "Collateral amount must be greater than zero");
        require(
            rbtc.transferFrom(msg.sender, address(this), amount),
            "RBTC transfer failed"
        );

        collateralBalances[msg.sender] += amount;
    }

    function requestLoan(
        uint256 loanAmount,
        uint256 btcPriceUSD,
        uint256 collateralizationRatio,
        uint256 interestRatePerDay
    ) external {
        require(
            !loans[msg.sender].active,
            "An active loan already exists for this address"
        );
        require(loanAmount > 0, "Loan amount must be greater than zero");
        require(
            collateralizationRatio > 0,
            "Collateralization ratio must be greater than zero"
        );
        require(
            interestRatePerDay > 0,
            "Interest rate per day must be greater than zero"
        );

        uint256 collateralRequired = (loanAmount * collateralizationRatio) /
            100;
        uint256 collateralValueUSD = collateralBalances[msg.sender] *
            btcPriceUSD;

        require(
            collateralValueUSD >= collateralRequired,
            "Insufficient collateral based on the provided collateralization ratio"
        );

        // create loan with unique collateralization ratio and interest rate
        loans[msg.sender] = Loan({
            principal: loanAmount,
            collateral: collateralBalances[msg.sender],
            interestAccrued: 0,
            startDate: block.timestamp,
            collateralizationRatio: collateralizationRatio,
            interestRatePerDay: interestRatePerDay,
            active: true
        });

        // transfer loan amount in stablecoin
        require(
            stablecoin.transfer(msg.sender, loanAmount),
            "Stablecoin transfer failed for loan amount"
        );
    }

    function repayLoan(uint256 repaymentAmount) external {
        Loan storage loan = loans[msg.sender];
        require(loan.active, "No active loan to repay for this address");

        uint256 daysElapsed = (block.timestamp - loan.startDate) / 1 days;
        uint256 totalInterest = ((loan.principal * loan.interestRatePerDay) /
            100) * daysElapsed;
        uint256 totalRepaymentRequired = loan.principal + totalInterest;

        require(
            repaymentAmount >= totalRepaymentRequired,
            "Repayment amount is less than the total amount due"
        );

        // repay loan and release collateral
        require(
            stablecoin.transferFrom(msg.sender, address(this), repaymentAmount),
            "Stablecoin transfer failed for repayment"
        );

        loan.active = false;
        collateralBalances[msg.sender] -= loan.collateral;
        require(
            rbtc.transfer(msg.sender, loan.collateral),
            "Collateral release transfer failed"
        );
    }

    function checkLiquidation(
        uint256 btcPriceUSD,
        uint256 liquidationThreshold
    ) external {
        Loan storage loan = loans[msg.sender];
        require(
            loan.active,
            "No active loan to check liquidation for this address"
        );

        uint256 collateralValueUSD = loan.collateral * btcPriceUSD;
        uint256 loanValueUSD = loan.principal;

        require(
            (collateralValueUSD * 100) / loanValueUSD < liquidationThreshold,
            "Loan is above liquidation threshold; no liquidation required"
        );

        // liquidate loan if collateral value falls below the threshold
        loan.active = false;
        collateralBalances[msg.sender] -= loan.collateral;
        require(
            rbtc.transfer(msg.sender, loan.collateral),
            "Collateral release transfer failed during liquidation"
        );
    }

    function getLoanDetails(
        address borrower
    ) external view returns (Loan memory) {
        return loans[borrower];
    }
}
