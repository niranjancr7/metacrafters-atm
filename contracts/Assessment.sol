// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;
    uint256 public interestRate; 
    bool public isAccountLocked;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event InterestAccrued(uint256 amount);
    event AccountLocked();
    event AccountUnlocked();

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner of this account");
        _;
    }

    modifier notLocked() {
        require(!isAccountLocked, "Account is locked");
        _;
    }

    constructor(uint initBalance) payable {
    owner = payable(msg.sender);
    balance = initBalance;
    interestRate = 0; 
    isAccountLocked = false;
}


    function getBalance() public view returns (uint256) {
        return balance;
    }

    function deposit() public payable onlyOwner notLocked {
        balance += msg.value;
        emit Deposit(msg.value);
    }

    function withdraw(uint256 _withdrawAmount) public onlyOwner notLocked {
        require(_withdrawAmount <= balance, "Insufficient balance");
        balance -= _withdrawAmount;
        payable(owner).transfer(_withdrawAmount);
        emit Withdraw(_withdrawAmount);
    }

    function reinvestInterest() public onlyOwner notLocked {
        uint256 interest = (balance * interestRate) / 100;
        balance += interest;
        emit InterestAccrued(interest);
    }

    function lockAccount() public onlyOwner {
        isAccountLocked = true;
        emit AccountLocked();
    }

    function unlockAccount() public onlyOwner {
        isAccountLocked = false;
        emit AccountUnlocked();
    }
}
