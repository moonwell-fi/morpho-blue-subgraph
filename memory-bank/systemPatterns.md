# System Patterns: Morpho Blue Subgraph

## System Architecture

The Morpho Blue subgraph follows a multi-layered architecture designed to index and organize lending protocol data:

```mermaid
flowchart TD
    subgraph Blockchain
        Events[Protocol Events]
        Contracts[Smart Contracts]
    end
    
    subgraph Indexing
        Handlers[Event Handlers]
        Initialization[Initializers]
        Constants[Constants/Config]
    end
    
    subgraph Data
        Protocol[Protocol Entity]
        Markets[Market Entities]
        Positions[Position Entities]
        Accounts[Account Entities]
        Events2[Event Entities]
        Snapshots[Snapshot Entities]
    end
    
    subgraph API
        GraphQL[GraphQL Endpoint]
    end
    
    Events --> Handlers
    Contracts --> Initialization
    Constants --> Handlers
    Constants --> Initialization
    
    Handlers --> Protocol
    Handlers --> Markets
    Handlers --> Positions
    Handlers --> Accounts
    Handlers --> Events2
    Handlers --> Snapshots
    
    Protocol --> GraphQL
    Markets --> GraphQL
    Positions --> GraphQL
    Accounts --> GraphQL
    Events2 --> GraphQL
    Snapshots --> GraphQL
```

## Key Technical Decisions

1. **Entity Relationship Model**: The subgraph uses a comprehensive entity model to represent the protocol components:
   - `LendingProtocol`: Top-level entity representing the entire protocol
   - `Market`: Represents individual lending/borrowing markets
   - `Position`: Represents user positions (supply, borrow, collateral)
   - `Account`: Represents user accounts interacting with the protocol
   - Events (`Deposit`, `Withdraw`, etc.): Represent user actions
   - MetaMorpho entities: Specialized entities for the MetaMorpho vault system

2. **Event-Driven Architecture**: The subgraph processes blockchain events to update entity states:
   - Event handlers listen for and process specific protocol events
   - Each event updates relevant entities and their relationships
   - Time-based snapshots are generated for historical analysis

3. **Snapshotting System**: Implements multiple snapshot types:
   - Daily and hourly snapshots for metrics
   - Position snapshots for position changes
   - Protocol-level and market-level snapshots

4. **Oracle Integration**: Uses Chainlink oracles for price data:
   - Tracks oracle addresses and updates
   - Maintains price history for assets
   - Converts token amounts to USD values

## Design Patterns

### Entity Inheritance Pattern
- Uses GraphQL interfaces for shared fields
- `Event` interface implemented by concrete event types
- `Protocol` interface implemented by `LendingProtocol`

### Composite Entity Pattern
- Complex entities like `Market` contain references to other entities (Token, Oracle)
- Many-to-many relationships managed through collections and derivations

### Time-Series Data Pattern
- Daily/hourly snapshots for time-series analysis
- Consistent timestamps and period markers
- Cumulative and period-specific metrics

### Transactional Event Pattern
- Each blockchain transaction mapped to typed event entities
- Events linked to affected positions and accounts
- Complete historical record of all protocol interactions

### Helper Entity Pattern
- Uses helper entities like `_MarketList`, `_PositionCounter` for internal operations
- Maintains counters and indices for efficient entity creation

## MetaMorpho Integration

The subgraph includes specialized handling for the MetaMorpho vault system:

```mermaid
flowchart TD
    MetaMorpho[MetaMorpho Vault]
    Markets[Markets]
    Positions[User Positions]
    Allocators[Allocators]
    PublicAllocator[Public Allocator]
    
    MetaMorpho --> Markets
    MetaMorpho --> Positions
    MetaMorpho --> Allocators
    Allocators --> PublicAllocator
    PublicAllocator --> Markets
```

Key components:
- **MetaMorpho Vaults**: Aggregate user funds into a single vault
- **MetaMorpho Markets**: Markets that vaults interact with
- **Allocators**: Entities that determine capital allocation
- **Public Allocator**: Special allocator allowing public participation

## Component Relationships

```mermaid
flowchart LR
    subgraph Protocol
        P[LendingProtocol]
    end
    
    subgraph Markets
        M1[Market 1]
        M2[Market 2]
        M3[Market 3]
    end
    
    subgraph Positions
        Pos1[Position 1]
        Pos2[Position 2]
        Pos3[Position 3]
    end
    
    subgraph Accounts
        A1[Account 1]
        A2[Account 2]
    end
    
    subgraph Events
        E1[Deposit]
        E2[Borrow]
        E3[Repay]
    end
    
    P --> M1
    P --> M2
    P --> M3
    
    M1 --> Pos1
    M2 --> Pos2
    M3 --> Pos3
    
    A1 --> Pos1
    A1 --> Pos2
    A2 --> Pos3
    
    Pos1 --> E1
    Pos2 --> E2
    Pos3 --> E3
```

## Technical Implementation Details

### Price Feed System
The subgraph implements a sophisticated price feed system using Chainlink oracles:
- Oracle proxies tracked with their aggregator implementations
- Price updates recorded with timestamps
- Price conversion utils for accurate USD calculations

### Interest Rate Calculations
Interest rates are tracked and calculated through:
- Market interest rate models (IRMs)
- Supply and borrow indices for each market
- APR/APY calculations using these indices

### Share-based Accounting
The system uses share-based accounting for:
- User positions in markets
- MetaMorpho vault participation 
- Proper interest accrual

### Event Handler Implementation
Events are processed through specialized handlers that:
1. Identify relevant entities
2. Update entity states
3. Create related entities if needed
4. Record event specifics
5. Update counters and metrics
