import { Address, BigDecimal, BigInt, dataSource } from "@graphprotocol/graph-ts";

import { ChainlinkPriceFeed } from "../generated/MorphoBlue/ChainlinkPriceFeed";
import { ERC4626 } from "../generated/MorphoBlue/ERC4626";
import { REth } from "../generated/MorphoBlue/REth";
import { WstEth } from "../generated/MorphoBlue/WstEth";

import { BIGDECIMAL_ONE, BIGDECIMAL_WAD, BIGINT_WAD } from "./sdk/constants";
import { optimismPriceFeeds } from "./constants/optimismPriceFeeds";
import { basePriceFeedsBtc, basePriceFeedsEth, basePriceFeedsUsd, baseTokenAddresses } from "./constants/basePriceFeeds";
// I'm wrapping addresses and formatting them back to string to ensure resilience with capitalization.
const wbib01 = Address.fromString(
  "0xca2a7068e551d5c4482eb34880b194e4b945712f"
).toHexString();

const wstEth = Address.fromString(
  "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0"
).toHexString();

const weth = Address.fromString(
  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
).toHexString();

const wbtc = Address.fromString(
  "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"
).toHexString();

const usdc = Address.fromString(
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
).toHexString();

const sdai = Address.fromString(
  "0x83F20F44975D03b1b09e64809B757c47f942BEeA"
).toHexString();

const dai = Address.fromString(
  "0x6B175474E89094C44Da98b954EedeAC495271d0F"
).toHexString();

const weETH = Address.fromString(
  "0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee"
).toHexString();

const osETH = Address.fromString(
  "0xf1C9acDc66974dFB6dEcB12aA385b9cD01190E38"
).toHexString();

const usdt = Address.fromString(
  "0xdac17f958d2ee523a2206206994597c13d831ec7"
).toHexString();

const rEth = Address.fromString(
  "0xae78736cd615f374d3085123a210448e74fc6393"
).toHexString();

const pyUsd = Address.fromString(
  "0x6c3ea9036406852006290770BEdFcAbA0e23A0e8"
).toHexString();

const wusdm = Address.fromString(
  "0x57f5e098cad7a3d1eed53991d4d66c45c9af7812"
).toHexString();

const wbc3m = Address.fromString(
  "0x95d7337d43340e2721960dc402d9b9117f0d81a2"
).toHexString();

const EURe = Address.fromString(
  "0x3231cb76718cdef2155fc47b5286d82e6eda273f"
).toHexString();

const eurc = Address.fromString(
  "0x1abaea1f7c830bd89acc67ec4af516284b1bc33c"
).toHexString();

const ezETH = Address.fromString(
  "0xbf5495Efe5DB9ce00f80364C8B423567e58d2110"
).toHexString();

const mkr = Address.fromString(
  "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2"
).toHexString();

const sUSDE = Address.fromString(
  "0x9D39A5DE30e57443BfF2A8307A4256c8797A3497"
).toHexString();
const usde = Address.fromString(
  "0x4c9EDD5852cd905f086C759E8383e09bff1E68B3"
).toHexString();


const usdPriceFeeds = new Map<string, string>()
  .set(
    wbib01,
    Address.fromString(
      "0x32d1463EB53b73C095625719Afa544D5426354cB"
    ).toHexString()
  )
  .set(
    weth,
    Address.fromString(
      "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"
    ).toHexString()
  )
  .set(
    usdc,
    Address.fromString(
      "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6"
    ).toHexString()
  )
  .set(
    dai,
    Address.fromString(
      "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9"
    ).toHexString()
  )
  .set(
    weETH,
    Address.fromString(
      "0xdDb6F90fFb4d3257dd666b69178e5B3c5Bf41136"
    ).toHexString()
  )
  .set(
    usdt,
    Address.fromString(
      "0x3E7d1eAB13ad0104d2750B8863b489D65364e32D"
    ).toHexString()
  )
  .set(
    EURe,
    Address.fromString(
      "0xb49f677943BC038e9857d61E7d053CaA2C1734C1"
    ).toHexString()
  )
  .set(
    eurc,
    Address.fromString(
      "0xb49f677943BC038e9857d61E7d053CaA2C1734C1"
    ).toHexString()
  )
  .set(
    mkr,
    Address.fromString(
      "0xec1D1B3b0443256cc3860e24a46F108e699484Aa"
    ).toHexString()
  );

const ethPriceFeeds = new Map<string, string>()
  .set(
    osETH,
    Address.fromString(
      "0x66ac817f997Efd114EDFcccdce99F3268557B32C"
    ).toHexString()
  )
  .set(
    ezETH,
    Address.fromString(
      "0xF4a3e183F59D2599ee3DF213ff78b1B3b1923696"
    ).toHexString()
  );

const eurPriceFeeds = new Map<string, string>().set(
  wbc3m,
  Address.fromString("0x83ec02059f686e747392a22ddfed7833ba0d7ce3").toHexString()
);

function fetchPriceFromFeed(feedAddress: Address): BigDecimal {
  const chainlinkPriceFeed = ChainlinkPriceFeed.bind(feedAddress);
  return chainlinkPriceFeed
    .latestRoundData()
    .getAnswer()
    .toBigDecimal()
    .div(
      BigInt.fromString("10")
        .pow(chainlinkPriceFeed.decimals() as u8)
        .toBigDecimal()
    );
}

export function fetchUsdTokenPrice(tokenAddress: Address): BigDecimal {

  const network = dataSource.network();

  if (network == "base") {

    if (basePriceFeedsUsd.has(tokenAddress.toHexString())) {
      const basePriceFeed = basePriceFeedsUsd.get(tokenAddress.toHexString());
      return fetchPriceFromFeed(Address.fromString(basePriceFeed));
    }

    if (basePriceFeedsBtc.has(tokenAddress.toHexString())) {
      const basePriceFeedBtc = basePriceFeedsBtc.get(tokenAddress.toHexString());
      return fetchPriceFromFeed(Address.fromString(basePriceFeedBtc)).times(
        fetchUsdTokenPrice(Address.fromString(baseTokenAddresses.get("WBTC")))
      );
    }

    if (basePriceFeedsEth.has(tokenAddress.toHexString())) {
      const basePriceFeedEth = basePriceFeedsEth.get(tokenAddress.toHexString());
      return fetchPriceFromFeed(Address.fromString(basePriceFeedEth)).times(
        fetchUsdTokenPrice(Address.fromString(baseTokenAddresses.get("WETH")))
      );
    }


  } else if (network == "optimism") {

    if (optimismPriceFeeds.has(tokenAddress.toHexString())) {
      const optimismPriceFeed = optimismPriceFeeds.get(tokenAddress.toHexString());
      return fetchPriceFromFeed(Address.fromString(optimismPriceFeed));
    }

  } else if (network == "mainnet") {

    if (usdPriceFeeds.has(tokenAddress.toHexString())) {
      const chainlinkPriceFeed = Address.fromString(
        usdPriceFeeds.get(tokenAddress.toHexString())
      );

      return fetchPriceFromFeed(chainlinkPriceFeed);
    }

    if (ethPriceFeeds.has(tokenAddress.toHexString())) {
      const chainlinkPriceFeed = Address.fromString(
        ethPriceFeeds.get(tokenAddress.toHexString())
      );
      return fetchPriceFromFeed(chainlinkPriceFeed).times(
        fetchUsdTokenPrice(Address.fromString(weth))
      );
    }

    if (eurPriceFeeds.has(tokenAddress.toHexString())) {
      const chainlinkPriceFeed = Address.fromString(
        eurPriceFeeds.get(tokenAddress.toHexString())
      );

      return fetchPriceFromFeed(chainlinkPriceFeed).times(
        fetchUsdTokenPrice(Address.fromString(EURe))
      );
    }

    if (tokenAddress.equals(Address.fromString(wstEth))) {
      const wstEthContract = WstEth.bind(Address.fromString(wstEth));
      return wstEthContract
        .getStETHByWstETH(BIGINT_WAD)
        .toBigDecimal()
        .div(BIGDECIMAL_WAD)
        .times(fetchUsdTokenPrice(Address.fromString(weth)));
    }

    if (tokenAddress.equals(Address.fromString(rEth))) {
      const rEthContract = REth.bind(Address.fromString(rEth));
      return rEthContract
        .getExchangeRate()
        .toBigDecimal()
        .div(BIGDECIMAL_WAD)
        .times(fetchUsdTokenPrice(Address.fromString(weth)));
    }

    if (tokenAddress.equals(Address.fromString(wbtc))) {
      const wbtcBtcPriceFeed = Address.fromString(
        "0xfdFD9C85aD200c506Cf9e21F1FD8dd01932FBB23"
      );

      const btcUsdPriceFeed = Address.fromString(
        "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c"
      );

      return fetchPriceFromFeed(btcUsdPriceFeed).times(
        fetchPriceFromFeed(wbtcBtcPriceFeed)
      );
    }

    if (tokenAddress.equals(Address.fromString(sdai))) {
      const sDaiContract = ERC4626.bind(Address.fromString(sdai));
      return sDaiContract
        .convertToAssets(BIGINT_WAD)
        .toBigDecimal()
        .div(BIGDECIMAL_WAD)
        .times(fetchUsdTokenPrice(Address.fromString(dai)));
    }

    if (
      tokenAddress.equals(Address.fromString(wusdm)) ||
      tokenAddress.equals(Address.fromString(sUSDE))
    ) {
      const erc4626 = ERC4626.bind(Address.fromString(wusdm));
      // exchange rate of the underlying is 1 USD
      return erc4626
        .convertToAssets(BIGINT_WAD)
        .toBigDecimal()
        .div(BIGDECIMAL_WAD);
    }

    if (
      tokenAddress.equals(Address.fromString(pyUsd)) ||
      tokenAddress.equals(Address.fromString(usde))
    ) {
      // price is hardcoded at 1 since the token is regulated. This is also the case in the trusted oracles.
      return BIGDECIMAL_ONE;
    }
  }


  return BigDecimal.zero();
}
