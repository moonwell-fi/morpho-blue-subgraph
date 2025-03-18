# Project Brief: Morpho Blue Subgraph

## Overview
This project implements a subgraph for indexing Morpho Blue protocol data on various networks. The subgraph tracks markets, positions, transactions, and related metrics for the Morpho Blue lending protocol and MetaMorpho system.

## Core Requirements
1. Index all Morpho Blue markets across supported networks
2. Track user positions (supply, borrow, collateral)
3. Record transaction history and protocol events
4. Calculate and expose key metrics (APY, TVL, utilization rates)
5. Support MetaMorpho vaults and allocators
6. Provide accurate price feeds for assets using Chainlink oracles

## Goals
- Create a comprehensive, accurate, and performant data indexing solution
- Enable analytics and insights for Morpho Blue protocol usage
- Support dApps that need to display Morpho Blue data
- Facilitate integration with dashboards and monitoring tools
- Maintain compatibility with protocol upgrades

## Success Criteria
- 100% indexing accuracy compared to on-chain data
- Fast synchronization with minimal latency
- Comprehensive GraphQL API covering all relevant protocol data
- Reliability and error handling for edge cases
- Well-documented schema and query examples
