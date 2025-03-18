# Event Handlers and Aggregations: Morpho Blue Subgraph

This document provides a comprehensive overview of all event handlers and data aggregation processes in the Morpho Blue subgraph. Event handlers are the core of the subgraph's functionality, transforming blockchain events into structured data entities.

## Core Morpho Blue Handlers

### Market Management

#### `handleCreateMarket`
- **Event**: `CreateMarket(indexed bytes32,(address,address,address,address,uint256))`
- **Purpose**: Processes new market creation
- **Entities Updated**: 
  - Creates new `Market` entity
  - Updates `LendingProtocol` total pool count
  - Creates `Oracle` entity for the market
- **Aggregations**:
  - Increments protocol `totalPoolCount`
  - Initializes market metrics (TVL, deposits, borrows)

#### `handleEnableIrm`
- **Event**: `EnableIrm(indexed address)`
- **Purpose**: Records newly enabled Interest Rate Models
- **Entities Updated**: 
  - Adds IRM to `LendingProtocol.irmEnabled` array
- **Aggregations**: None

#### `handleEnableLltv`
- **Event**: `EnableLltv(uint256)`
- **Purpose**: Records newly enabled Loan-to-Value ratios
- **Entities Updated**: 
  - Adds LLTV to `LendingProtocol.lltvEnabled` array
- **Aggregations**: None

#### `handleSetFee`
- **Event**: `SetFee(indexed bytes32,uint256)`
- **Purpose**: Updates market fee settings
- **Entities Updated**: 
  - Updates `Market.fee`
- **Aggregations**: None

#### `handleSetFeeRecipient`
- **Event**: `SetFeeRecipient(indexed address)`
- **Purpose**: Updates protocol fee recipient
- **Entities Updated**: 
  - Updates `LendingProtocol.feeRecipient`
- **Aggregations**: None

#### `handleSetOwner`
- **Event**: `SetOwner(indexed address)`
- **Purpose**: Updates protocol owner
- **Entities Updated**: 
  - Updates `LendingProtocol.owner`
- **Aggregations**: None

### Supply/Borrow Operations

#### `handleSupply`
- **Event**: `Supply(indexed bytes32,indexed address,indexed address,uint256,uint256)`
- **Purpose**: Processes supply (lending) transactions
- **Entities Updated**: 
  - Creates/updates `Position` (lender side)
  - Creates `Deposit` event entity
  - Updates `Market` stats
  - Updates `Account` metrics
- **Aggregations**:
  - Increments market `totalSupply`
  - Increments market `totalSupplyShares`
  - Increments market deposit counts
  - Updates market TVL
  - Updates position snapshot
  - Aggregates protocol-level supply metrics

#### `handleSupplyCollateral`
- **Event**: `SupplyCollateral(indexed bytes32,indexed address,indexed address,uint256)`
- **Purpose**: Processes collateral supply transactions
- **Entities Updated**: 
  - Creates/updates `Position` (collateral side)
  - Creates `Deposit` event entity (with isCollateral flag)
  - Updates `Market` collateral stats
  - Updates `Account` metrics
- **Aggregations**:
  - Increments market `totalCollateral`
  - Increments market collateral position count
  - Updates market TVL
  - Updates position snapshot
  - Aggregates protocol-level collateral metrics

#### `handleBorrow`
- **Event**: `Borrow(indexed bytes32,address,indexed address,indexed address,uint256,uint256)`
- **Purpose**: Processes borrow transactions
- **Entities Updated**: 
  - Creates/updates `Position` (borrower side)
  - Creates `Borrow` event entity
  - Updates `Market` borrow stats
  - Updates `Account` metrics
- **Aggregations**:
  - Increments market `totalBorrow`
  - Increments market `totalBorrowShares`
  - Increments market borrow counts
  - Updates market utilization metrics
  - Updates position snapshot
  - Aggregates protocol-level borrow metrics

#### `handleRepay`
- **Event**: `Repay(indexed bytes32,indexed address,indexed address,uint256,uint256)`
- **Purpose**: Processes loan repayment transactions
- **Entities Updated**: 
  - Updates `Position` (borrower side)
  - Creates `Repay` event entity
  - Updates `Market` borrow stats
  - Updates `Account` metrics
- **Aggregations**:
  - Decrements market `totalBorrow`
  - Decrements market `totalBorrowShares`
  - Increments repayment counts
  - Updates market utilization metrics
  - Updates position snapshot
  - Aggregates protocol-level repayment metrics

#### `handleWithdraw`
- **Event**: `Withdraw(indexed bytes32,address,indexed address,indexed address,uint256,uint256)`
- **Purpose**: Processes withdrawal transactions
- **Entities Updated**: 
  - Updates `Position` (lender side)
  - Creates `Withdraw` event entity
  - Updates `Market` supply stats
  - Updates `Account` metrics
- **Aggregations**:
  - Decrements market `totalSupply`
  - Decrements market `totalSupplyShares`
  - Increments withdrawal counts
  - Updates market TVL
  - Updates position snapshot
  - Aggregates protocol-level withdrawal metrics

#### `handleWithdrawCollateral`
- **Event**: `WithdrawCollateral(indexed bytes32,address,indexed address,indexed address,uint256)`
- **Purpose**: Processes collateral withdrawal transactions
- **Entities Updated**: 
  - Updates `Position` (collateral side)
  - Creates `Withdraw` event entity (with isCollateral flag)
  - Updates `Market` collateral stats
  - Updates `Account` metrics
- **Aggregations**:
  - Decrements market `totalCollateral`
  - Increments withdrawal counts
  - Updates market collateral metrics
  - Updates position snapshot
  - Aggregates protocol-level collateral metrics

### Interest and Liquidations

#### `handleAccrueInterest`
- **Event**: `AccrueInterest(indexed bytes32,uint256,uint256,uint256)`
- **Purpose**: Processes interest accrual on markets
- **Entities Updated**: 
  - Updates `Market` interest stats
  - Updates `InterestRate` entities
- **Aggregations**:
  - Updates total supply and borrow with accrued interest
  - Updates supply and borrow APY rates
  - Updates market revenue metrics
  - Updates protocol-level revenue metrics
  - Updates total borrowing costs

#### `handleLiquidate`
- **Event**: `Liquidate(indexed bytes32,indexed address,indexed address,uint256,uint256,uint256,uint256,uint256)`
- **Purpose**: Processes liquidation transactions
- **Entities Updated**: 
  - Updates liquidated `Position`
  - Creates `Liquidate` event entity
  - Updates `Market` liquidation stats
  - Updates `Account` metrics for liquidator and liquidatee
- **Aggregations**:
  - Decrements borrower position
  - Decrements liquidated collateral
  - Updates liquidation counts and volumes
  - Calculates liquidation profit
  - Tracks bad debt if applicable
  - Updates protocol-level liquidation metrics

### Other Operations

#### `handleFlashLoan`
- **Event**: `FlashLoan(indexed address,indexed address,uint256)`
- **Purpose**: Processes flashloan transactions
- **Entities Updated**: 
  - Creates `Flashloan` event entity
  - Updates `Market` flashloan stats
  - Updates `Account` metrics
- **Aggregations**:
  - Increments flashloan counts and volumes
  - Calculates flashloan fees
  - Updates protocol-level flashloan metrics

#### `handleIncrementNonce`
- **Event**: `IncrementNonce(indexed address,indexed address,uint256)`
- **Purpose**: Tracks nonce increments for meta-transactions
- **Entities Updated**: None (metadata only)
- **Aggregations**: None

#### `handleSetAuthorization`
- **Event**: `SetAuthorization(indexed address,indexed address,indexed address,bool)`
- **Purpose**: Tracks authorization settings for delegates
- **Entities Updated**: None (metadata only)
- **Aggregations**: None

## MetaMorpho Factory Handlers

### `handleCreateMetaMorpho`
- **Event**: `CreateMetaMorpho(indexed address,indexed address,address,uint256,indexed address,string,string,bytes32)`
- **Purpose**: Processes new MetaMorpho vault creation
- **Entities Updated**: 
  - Creates new `MetaMorpho` entity
  - Creates initial `MetaMorphoMarket` relationships
  - Creates `Account` associations for vault participants
- **Aggregations**:
  - Initializes vault metrics (total assets, shares)
  - Associates vault with underlying asset
  - Sets up governance and allocator relationships

## MetaMorpho Vault Handlers

### Vault Management

#### `handleAccrueInterest` (MetaMorpho)
- **Event**: `AccrueInterest(uint256,uint256)`
- **Purpose**: Processes interest accrual for MetaMorpho vaults
- **Entities Updated**: 
  - Updates `MetaMorpho` interest stats
  - Updates `InterestRate` entities for the vault
- **Aggregations**:
  - Updates vault total assets with accrued interest
  - Updates vault APY rate
  - Updates fee accrual

#### `handleSetFee` (MetaMorpho)
- **Event**: `SetFee(indexed address,uint256)`
- **Purpose**: Updates vault fee settings
- **Entities Updated**: 
  - Updates `MetaMorpho.fee`
- **Aggregations**: None

#### `handleSetFeeRecipient` (MetaMorpho)
- **Event**: `SetFeeRecipient(indexed address)`
- **Purpose**: Updates vault fee recipient
- **Entities Updated**: 
  - Updates `MetaMorpho.feeRecipient`
  - Creates or updates `FeeRecipient` entity
- **Aggregations**: None

#### `handleSetCurator`
- **Event**: `SetCurator(indexed address)`
- **Purpose**: Updates vault curator
- **Entities Updated**: 
  - Updates `MetaMorpho.curator`
- **Aggregations**: None

#### `handleSetTimelock`
- **Event**: `SetTimelock(indexed address,uint256)`
- **Purpose**: Updates vault timelock period
- **Entities Updated**: 
  - Updates `MetaMorpho.timelock`
- **Aggregations**: None

#### `handleSubmitTimelock`
- **Event**: `SubmitTimelock(uint256)`
- **Purpose**: Processes timelock change submission
- **Entities Updated**: 
  - Creates `PendingTimelock` entity
  - Updates `MetaMorpho.currentPendingTimelock`
- **Aggregations**: None

#### `handleRevokePendingTimelock`
- **Event**: `RevokePendingTimelock(indexed address)`
- **Purpose**: Processes timelock change revocation
- **Entities Updated**: 
  - Updates `PendingTimelock.status` to REJECTED
  - Updates `MetaMorpho.currentPendingTimelock`
- **Aggregations**: None

### Market Management

#### `handleSetCap`
- **Event**: `SetCap(indexed address,indexed bytes32,uint256)`
- **Purpose**: Updates market cap in vault
- **Entities Updated**: 
  - Updates `MetaMorphoMarket.cap`
- **Aggregations**: None

#### `handleSubmitCap`
- **Event**: `SubmitCap(indexed address,indexed bytes32,uint256)`
- **Purpose**: Processes market cap change submission
- **Entities Updated**: 
  - Creates `PendingCap` entity
  - Updates `MetaMorphoMarket.currentPendingCap`
- **Aggregations**: None

#### `handleRevokePendingCap`
- **Event**: `RevokePendingCap(indexed address,indexed bytes32)`
- **Purpose**: Processes market cap change revocation
- **Entities Updated**: 
  - Updates `PendingCap.status` to REJECTED
  - Updates `MetaMorphoMarket.currentPendingCap`
- **Aggregations**: None

#### `handleSetSupplyQueue`
- **Event**: `SetSupplyQueue(indexed address,bytes32[])`
- **Purpose**: Updates the vault's supply queue
- **Entities Updated**: 
  - Updates `MetaMorpho.supplyQueue`
  - Updates `MetaMorphoMarket.isInSupplyQueue`
  - Creates `NewQueue` entity with type SUPPLY_QUEUE
- **Aggregations**:
  - Tracks added and removed markets in queue

#### `handleSetWithdrawQueue`
- **Event**: `SetWithdrawQueue(indexed address,bytes32[])`
- **Purpose**: Updates the vault's withdraw queue
- **Entities Updated**: 
  - Updates `MetaMorpho.withdrawQueue`
  - Updates `MetaMorphoMarket.isInWithdrawQueue`
  - Creates `NewQueue` entity with type WITHDRAW_QUEUE
- **Aggregations**:
  - Tracks added and removed markets in queue

#### `handleSubmitMarketRemoval`
- **Event**: `SubmitMarketRemoval(indexed address,indexed bytes32)`
- **Purpose**: Processes market removal submission
- **Entities Updated**: 
  - Updates `MetaMorphoMarket.removableAt`
- **Aggregations**: None

#### `handleRevokePendingMarketRemoval`
- **Event**: `RevokePendingMarketRemoval(indexed address,indexed bytes32)`
- **Purpose**: Processes market removal revocation
- **Entities Updated**: 
  - Updates `MetaMorphoMarket.removableAt` to zero
- **Aggregations**: None

### Allocator Management

#### `handleSetIsAllocator`
- **Event**: `SetIsAllocator(indexed address,bool)`
- **Purpose**: Updates allocator status
- **Entities Updated**: 
  - Creates or updates `MetaMorphoAllocator` entity
  - Updates `MetaMorpho.allocators`
  - Creates `AllocatorSet` event entity
- **Aggregations**: None

#### `handleSetGuardian`
- **Event**: `SetGuardian(indexed address,indexed address)`
- **Purpose**: Updates vault guardian
- **Entities Updated**: 
  - Updates `MetaMorpho.guardian`
- **Aggregations**: None

#### `handleSubmitGuardian`
- **Event**: `SubmitGuardian(indexed address)`
- **Purpose**: Processes guardian change submission
- **Entities Updated**: 
  - Creates `PendingGuardian` entity
  - Updates `MetaMorpho.currentPendingGuardian`
- **Aggregations**: None

#### `handleRevokePendingGuardian`
- **Event**: `RevokePendingGuardian(indexed address)`
- **Purpose**: Processes guardian change revocation
- **Entities Updated**: 
  - Updates `PendingGuardian.status` to REJECTED
  - Updates `MetaMorpho.currentPendingGuardian`
- **Aggregations**: None

### User Operations

#### `handleDeposit` (MetaMorpho)
- **Event**: `Deposit(indexed address,indexed address,uint256,uint256)`
- **Purpose**: Processes deposits into MetaMorpho vaults
- **Entities Updated**: 
  - Creates or updates `MetaMorphoPosition` entity
  - Creates `MetaMorphoDeposit` event entity
  - Updates `MetaMorpho` asset and share totals
  - Updates `Account` metrics
- **Aggregations**:
  - Increments vault `totalShares`
  - Updates vault `lastTotalAssets`
  - Updates position assets and shares
  - Calculates USD values

#### `handleWithdraw` (MetaMorpho)
- **Event**: `Withdraw(indexed address,indexed address,indexed address,uint256,uint256)`
- **Purpose**: Processes withdrawals from MetaMorpho vaults
- **Entities Updated**: 
  - Updates `MetaMorphoPosition` entity
  - Creates `MetaMorphoWithdraw` event entity
  - Updates `MetaMorpho` asset and share totals
  - Updates `Account` metrics
- **Aggregations**:
  - Decrements vault `totalShares`
  - Updates vault `lastTotalAssets`
  - Updates position assets and shares
  - Calculates USD values

#### `handleTransfer`
- **Event**: `Transfer(indexed address,indexed address,uint256)`
- **Purpose**: Processes transfers of MetaMorpho vault shares
- **Entities Updated**: 
  - Updates sender and receiver `MetaMorphoPosition` entities
  - Creates `MetaMorphoTransfer` event entity
  - Updates `Account` metrics
- **Aggregations**:
  - Transfers shares between positions
  - Calculates equivalent asset values
  - Calculates USD values

#### `handleApproval`
- **Event**: `Approval(indexed address,indexed address,uint256)`
- **Purpose**: Tracks approvals for MetaMorpho vault shares
- **Entities Updated**: None (metadata only)
- **Aggregations**: None

### Reallocation Operations

#### `handleReallocateSupply`
- **Event**: `ReallocateSupply(indexed address,indexed bytes32,uint256,uint256)`
- **Purpose**: Processes reallocations of idle assets to markets
- **Entities Updated**: 
  - Updates `MetaMorpho.idle`
  - Updates market allocation metrics
- **Aggregations**:
  - Decrements vault idle assets
  - Updates allocation to specific market
  - Calculates efficiency metrics

#### `handleReallocateWithdraw`
- **Event**: `ReallocateWithdraw(indexed address,indexed bytes32,uint256,uint256)`
- **Purpose**: Processes reallocations from markets to idle
- **Entities Updated**: 
  - Updates `MetaMorpho.idle`
  - Updates market allocation metrics
- **Aggregations**:
  - Increments vault idle assets
  - Updates allocation from specific market
  - Calculates efficiency metrics

#### `handleSkim`
- **Event**: `Skim(indexed address,indexed address,uint256)`
- **Purpose**: Processes skimming of excess assets
- **Entities Updated**: 
  - Updates `MetaMorpho` asset metrics
- **Aggregations**:
  - Calculates excess assets
  - Updates vault statistics

#### `handleSetSkimRecipient`
- **Event**: `SetSkimRecipient(indexed address)`
- **Purpose**: Updates skim recipient
- **Entities Updated**: 
  - Updates `MetaMorpho` skim configuration
- **Aggregations**: None

#### `handleUpdateLastTotalAssets`
- **Event**: `UpdateLastTotalAssets(uint256)`
- **Purpose**: Updates vault's last recorded total assets
- **Entities Updated**: 
  - Updates `MetaMorpho.lastTotalAssets`
- **Aggregations**:
  - Recalculates vault metrics based on new total

### Governance Events

#### `handleOwnershipTransferStarted`
- **Event**: `OwnershipTransferStarted(indexed address,indexed address)`
- **Purpose**: Tracks ownership transfer initiation
- **Entities Updated**: None (metadata only)
- **Aggregations**: None

#### `handleOwnershipTransferred`
- **Event**: `OwnershipTransferred(indexed address,indexed address)`
- **Purpose**: Processes ownership transfers
- **Entities Updated**: 
  - Updates `MetaMorpho.owner`
- **Aggregations**: None

#### `handleEIP712DomainChanged`
- **Event**: `EIP712DomainChanged()`
- **Purpose**: Tracks EIP712 domain changes
- **Entities Updated**: None (metadata only)
- **Aggregations**: None

## Public Allocator Handlers

#### `handlePublicReallocateTo`
- **Event**: `PublicReallocateTo(indexed address,indexed address,indexed bytes32,uint256)`
- **Purpose**: Processes public reallocations to markets
- **Entities Updated**: 
  - Creates `PublicAllocatorReallocationToEvent` entity
  - Updates `MetaMorphoPublicAllocatorMarket` flow metrics
  - Updates `MetaMorpho` allocation stats
- **Aggregations**:
  - Tracks public reallocation volumes
  - Updates market flow metrics

#### `handlePublicWithdrawal`
- **Event**: `PublicWithdrawal(indexed address,indexed address,indexed bytes32,uint256)`
- **Purpose**: Processes public withdrawals from markets
- **Entities Updated**: 
  - Creates `PublicAllocatorWithdrawalEvent` entity
  - Updates `MetaMorphoPublicAllocatorMarket` flow metrics
  - Updates `MetaMorpho` allocation stats
- **Aggregations**:
  - Tracks public withdrawal volumes
  - Updates market flow metrics

#### `handleSetAdmin`
- **Event**: `SetAdmin(indexed address,indexed address,address)`
- **Purpose**: Updates public allocator admin
- **Entities Updated**: 
  - Updates `MetaMorphoPublicAllocator.admin`
- **Aggregations**: None

#### `handleSetFee` (PublicAllocator)
- **Event**: `SetFee(indexed address,indexed address,uint256)`
- **Purpose**: Updates public allocator fee
- **Entities Updated**: 
  - Updates `MetaMorphoPublicAllocator.fee`
- **Aggregations**: None

#### `handleSetFlowCaps`
- **Event**: `SetFlowCaps(indexed address,indexed address,(bytes32,(uint128,uint128))[])`
- **Purpose**: Updates flow caps for markets
- **Entities Updated**: 
  - Creates `SetFlowCapsEvent` entity
  - Updates `MetaMorphoPublicAllocatorMarket` flow caps
  - Creates `MarketFlowCapsSet` entities
- **Aggregations**:
  - Tracks flow cap changes
  - Updates market flow limits

#### `handleTransferFee`
- **Event**: `TransferFee(indexed address,indexed address,uint256,indexed address)`
- **Purpose**: Processes fee transfers
- **Entities Updated**: 
  - Updates `MetaMorphoPublicAllocator` fee metrics
- **Aggregations**:
  - Updates fee accounting
  - Tracks fee distribution

## Chainlink Handlers

#### `handleConfirmAggregator` (call handler)
- **Function**: `confirmAggregator(address)`
- **Purpose**: Processes confirmation of new price aggregator
- **Entities Updated**: 
  - Updates `_ChainlinkProxy` entity
  - Updates `_ChainlinkAggregator` status
- **Aggregations**:
  - Tracks oracle source changes
  - Updates price feed lineage

#### `handleAnswerUpdated`
- **Event**: `AnswerUpdated(indexed int256,indexed uint256,uint256)`
- **Purpose**: Processes price updates from Chainlink feeds
- **Entities Updated**: 
  - Updates `_ChainlinkProxy` price data
  - Updates `Token` price if applicable
- **Aggregations**:
  - Converts raw price to USD value
  - Updates market USD values that use this price feed
  - Records price history

## Aggregation Processes

### Daily and Hourly Snapshots

The subgraph maintains time-based snapshots for protocol, market, and position data:

1. **Protocol-Level Aggregations**:
   - `UsageMetricsDailySnapshot`: Daily user and transaction metrics
   - `UsageMetricsHourlySnapshot`: Hourly user and transaction metrics
   - `FinancialsDailySnapshot`: Daily financial metrics (TVL, revenue, volume)

2. **Market-Level Aggregations**:
   - `MarketDailySnapshot`: Daily market-specific metrics
   - `MarketHourlySnapshot`: Hourly market-specific metrics

3. **Position-Level Aggregations**:
   - `PositionSnapshot`: Records position state changes

### Snapshot Generation Logic

Snapshots are generated based on:
1. **Time Triggers**:
   - Daily snapshots at UTC day boundaries
   - Hourly snapshots at hourly boundaries
   
2. **Event Triggers**:
   - Position snapshots on position-altering events
   - Market updates on significant market changes

### Metric Calculation Processes

The subgraph performs various metric calculations:

1. **Interest Accrual Calculation**:
   - Calculates accrued interest based on market rates and time elapsed
   - Updates supply and borrow indices
   - Distributes interest between suppliers and protocol

2. **USD Value Calculation**:
   - Converts token amounts to USD using oracle price feeds
   - Applies appropriate scaling based on token decimals
   - Updates USD-denominated metrics across all entities

3. **Market Rate Calculation**:
   - Calculates supply and borrow rates based on market utilization
   - Derives APY from growth in indices
   - Updates rate entities for historical tracking

4. **Revenue Attribution**:
   - Separates protocol revenue and user revenue
   - Tracks fee accrual and distribution
   - Maintains historical revenue metrics

5. **Position Value Calculation**:
   - Converts share balances to token amounts
   - Applies interest accrual to position balances
   - Calculates position health and risk metrics
