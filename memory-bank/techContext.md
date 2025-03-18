# Technical Context: Morpho Blue Subgraph

## Technologies Used

### Core Technologies
- **The Graph Protocol**: Framework for indexing blockchain data and exposing it through a GraphQL API
- **GraphQL**: Query language for APIs and runtime for executing those queries
- **TypeScript**: Strongly-typed JavaScript used for all subgraph code
- **AssemblyScript**: TypeScript-like language compiled to WebAssembly for subgraph mapping functions

### Blockchain Integration
- **Ethereum/EVM**: Primary blockchain platforms supported (Mainnet, Optimism, Base, etc.)
- **Web3**: Libraries for interacting with Ethereum nodes
- **Ethers.js**: JavaScript library for interacting with Ethereum (for testing)

### Data Management
- **Graph Node**: Local instance for development and testing
- **IPFS**: Used for subgraph deployment packages
- **PostgreSQL**: Database used by Graph nodes for storing indexed data

## Development Setup

### Project Structure
```
morpho-blue-subgraph/
├── abis/                    # JSON ABI files for smart contracts
│   ├── ERC20.json           # Standard ERC20 interface
│   ├── MorphoBlue.json      # Morpho Blue protocol interface
│   ├── MetaMorpho.json      # MetaMorpho vault interface
│   └── chainlink/           # Chainlink oracle interfaces
├── src/                     # Source code for subgraph mappings
│   ├── constants/           # Constant values and configuration
│   ├── initializers/        # Protocol initialization handlers
│   ├── maths/               # Mathematical utility functions
│   ├── sdk/                 # Helper functions for entity management
│   └── utils/               # General utility functions
├── schema.graphql           # GraphQL schema definition
├── subgraph.yaml            # Subgraph manifest
├── package.json             # NPM package configuration
└── tsconfig.json            # TypeScript configuration
```

### Build Process
1. Define schema in `schema.graphql`
2. Configure data sources in `subgraph.yaml`
3. Implement mapping handlers in TypeScript
4. Generate AssemblyScript types from ABIs and schema
5. Build subgraph with Graph CLI
6. Deploy to Graph Node (local) or The Graph Network (production)

### Testing Methodology
- Local development against a Graph Node instance
- Unit tests for utility functions
- Integration tests with blockchain data
- Validation against known on-chain values

## Technical Constraints

### The Graph Protocol Constraints
- **Deterministic Processing**: Handlers must be deterministic
- **Limited Libraries**: Only AssemblyScript-compatible libraries
- **No Network Calls**: Cannot make external API calls during indexing
- **WebAssembly Limitations**: Memory constraints and performance considerations
- **Entity Size**: Maximum entity size limitations

### Blockchain-Specific Constraints
- **Event-Driven**: Reliance on blockchain events for data updates
- **Reorg Handling**: Must handle blockchain reorganizations
- **Gas Optimizations**: Some protocols optimize for gas over clarity
- **Contract Upgrades**: Need to handle contract upgrades and migrations

### Data Handling Constraints
- **Numerical Precision**: Working with high-precision financial data
- **Large Data Volumes**: Efficient handling of large transaction volumes
- **Historical Accuracy**: Maintaining accurate historical snapshots
- **Cross-Chain Data**: Challenges in aggregating data across networks

## Dependencies

### Core Dependencies
- `@graphprotocol/graph-cli`: Command-line tools for building and deploying subgraphs
- `@graphprotocol/graph-ts`: TypeScript/AssemblyScript libraries for subgraph development
- `@graphprotocol/graph-node`: Local Graph node for development and testing

### Protocol Dependencies
- Morpho Blue Protocol Contracts
- MetaMorpho Vault Contracts 
- Public Allocator Contracts
- Chainlink Oracle Contracts

### Development Dependencies
- `typescript`: TypeScript compiler
- `prettier`: Code formatting
- `eslint`: Code linting
- `as-bignum`: Big number library for AssemblyScript
- `matchstick-as`: Testing framework for subgraphs

## Network Support

The subgraph is designed to support multiple networks where Morpho Blue is deployed:

| Network | Chain ID | Protocol Contracts | Status |
|---------|----------|-------------------|--------|
| Ethereum | 1 | Morpho Blue, MetaMorpho | Active |
| Optimism | 10 | Morpho Blue | Active |
| Base | 8453 | Morpho Blue | Active |
| Arbitrum | 42161 | Morpho Blue | Active |

## Deployment Architecture

```mermaid
flowchart TD
    subgraph "Development Environment"
        Dev[Developer Workstation]
        LocalNode[Local Graph Node]
        LocalIPFS[Local IPFS Node]
    end
    
    subgraph "Staging Environment"
        StagingNode[Staging Graph Node]
        StagingIPFS[Staging IPFS]
    end
    
    subgraph "Production Environment"
        TheGraph[The Graph Network]
        IPFS[IPFS Network]
        Indexers[Indexer Nodes]
        Gateway[Graph Gateway]
    end
    
    Dev -- Build --> LocalNode
    Dev -- Deploy --> StagingNode
    Dev -- Publish --> TheGraph
    
    LocalNode -- Store --> LocalIPFS
    StagingNode -- Store --> StagingIPFS
    TheGraph -- Store --> IPFS
    TheGraph -- Index --> Indexers
    Indexers -- Serve --> Gateway
    
    Client[Client Applications] -- Query --> Gateway
