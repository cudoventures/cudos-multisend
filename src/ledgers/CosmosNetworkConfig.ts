import BigNumber from 'bignumber.js'

export default class CosmosNetworkConfig {
  static CURRENCY_DISPLAY_NAME = 'FET'

  static CURRENCY_DENOM = 'afet'

  static CURRENCY_DECIMALS = 18

  static CURRENCY_COINGECKO_ID = 'fet'

  static CURRENCY_1_CUDO = new BigNumber(
    `1${'0'.repeat(CosmosNetworkConfig.CURRENCY_DECIMALS)}`
  )

  static LEDGER_COIN_TYPE = 118

  static BECH32_PREFIX_ACC_ADDR = 'fetch'

  static BECH32_PREFIX_ACC_PUB = 'fetchpub'

  static BECH32_PREFIX_VAL_ADDR = 'fetchvaloper'

  static BECH32_PREFIX_VAL_PUB = 'fetchvaloperpub'

  static BECH32_PREFIX_CONS_ADDR = 'fetchvalcons'

  static BECH32_PREFIX_CONS_PUB = 'fetchvalconspub'

  static BECH32_ACC_ADDR_LENGTH = 44
}
