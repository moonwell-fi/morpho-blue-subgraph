import { Address } from "@graphprotocol/graph-ts";

const optimismTokenAddresses = new Map<string, string>()
  .set("WETH", Address.fromString("0x4200000000000000000000000000000000000006").toHexString())
  .set("USDC", Address.fromString("0x0b2c639c533813f4aa9d7837caf62653d097ff85").toHexString())
  .set("wstETH", Address.fromString("0x1f32b1c2345538c0c6f582fcb022739c4a194ebb").toHexString());

export const optimismPriceFeeds = new Map<string, string>()
  .set(optimismTokenAddresses.get("WETH"), Address.fromString("0x13e3Ee699D1909E989722E753853AE30b17e08c5").toHexString())
  .set(optimismTokenAddresses.get("USDC"), Address.fromString("0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6").toHexString())
  .set(optimismTokenAddresses.get("wstETH"), Address.fromString("0x698B585CbC4407e2D54aa898B2600B53C68958f7").toHexString());
