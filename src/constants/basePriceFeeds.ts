import { Address } from "@graphprotocol/graph-ts";

export const baseTokenAddresses = new Map<string, string>()
  .set("WETH", Address.fromString("0x4200000000000000000000000000000000000006").toHexString())
  .set("USDC", Address.fromString("0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913").toHexString())
  .set("cbETH", Address.fromString("0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22").toHexString())
  .set("wstETH", Address.fromString("0xc1cba3fcea344f92d9239c08c0568f6f2f0ee452").toHexString())
  .set("rETH", Address.fromString("0xb6fe221fe9eef5aba221c348ba20a1bf5e73624c").toHexString())
  .set("weETH", Address.fromString("0x04c0599ae5a44757c0af6f9ec3b93da8976c150a").toHexString())
  .set("cbBTC", Address.fromString("0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf").toHexString())
  .set("AERO", Address.fromString("0x940181a94A35A4569E4529A3CDfB74e38FD98631").toHexString())
  .set("DAI", Address.fromString("0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb").toHexString())
  .set("USDbC", Address.fromString("0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca").toHexString())
  .set("EURC", Address.fromString("0x60a3E35Cc302bFA44Cb288Bc5a4F316Fdb1adb42").toHexString())
  .set("WELL", Address.fromString("0xA88594D404727625A9437C3f886C7643872296AE").toHexString())
  .set("PT_LBTC_29MAY2025", Address.fromString("0x5d746848005507DA0b1717C137A10C30AD9ee307").toHexString())
  .set("LBTC", Address.fromString("0xecAc9C5F704e954931349Da37F60E39f515c11c1").toHexString())
  .set("USDS", Address.fromString("0x820C137fa70C8691f0e44Dc420a5e53c168921Dc").toHexString())
  .set("tBTC", Address.fromString("0x236aa50979D5f3De3Bd1Eeb40E81137F22ab794b").toHexString())
  .set("VIRTUAL", Address.fromString("0x0b3e328455c4059EEb9e3f84b5543F74E24e7E1b").toHexString())
  .set("WBTC", Address.fromString("0x0555E30da8f98308EdB960aa94C0Db47230d2B9c").toHexString());

export const basePriceFeedsUsd = new Map<string, string>()
  .set(baseTokenAddresses.get("WETH"), Address.fromString("0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70").toHexString())
  .set(baseTokenAddresses.get("USDC"), Address.fromString("0x7e860098F58bBFC8648a4311b374B1D669a2bc6B").toHexString())
  .set(baseTokenAddresses.get("cbETH"), Address.fromString("0xd7818272B9e248357d13057AAb0B417aF31E817d").toHexString())
  .set(baseTokenAddresses.get("cbBTC"), Address.fromString("0x07DA0E54543a844a80ABE69c8A12F22B3aA59f9D").toHexString())
  .set(baseTokenAddresses.get("AERO"), Address.fromString("0x4EC5970fC728C5f65ba413992CD5fF6FD70fcfF0").toHexString())
  .set(baseTokenAddresses.get("DAI"), Address.fromString("0x591e79239a7d679378eC8c847e5038150364C78F").toHexString())
  .set(baseTokenAddresses.get("USDbC"), Address.fromString("0x7e860098F58bBFC8648a4311b374B1D669a2bc6B").toHexString())
  .set(baseTokenAddresses.get("EURC"), Address.fromString("0xDAe398520e2B67cd3f27aeF9Cf14D93D927f8250").toHexString())
  .set(baseTokenAddresses.get("WELL"), Address.fromString("0xc15d9944dAefE2dB03e53bef8DDA25a56832C5fe").toHexString())
  .set(baseTokenAddresses.get("USDS"), Address.fromString("0x2330aaE3bca5F05169d5f4597964D44522F62930").toHexString())
  .set(baseTokenAddresses.get("tBTC"), Address.fromString("0x6D75BFB5A5885f841b132198C9f0bE8c872057BF").toHexString())
  .set(baseTokenAddresses.get("WBTC"), Address.fromString("0x64c911996D3c6aC71f9b455B1E8E7266BcbD848F").toHexString());

export const basePriceFeedsEth = new Map<string, string>()
  .set(baseTokenAddresses.get("weETH"), Address.fromString("0xFC1415403EbB0c693f9a7844b92aD2Ff24775C65").toHexString())
  .set(baseTokenAddresses.get("rETH"), Address.fromString("0xf397bF97280B488cA19ee3093E81C0a77F02e9a5").toHexString())
  .set(baseTokenAddresses.get("wstETH"), Address.fromString("0x43a5C292A453A3bF3606fa856197f09D7B74251a").toHexString());

export const basePriceFeedsBtc = new Map<string, string>()
  .set(baseTokenAddresses.get("LBTC"), Address.fromString("0x1E6c22AAA11F507af12034A5Dc4126A6A25DC8d2").toHexString());
