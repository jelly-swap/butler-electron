const ADDRESSES_LENGTH = {
  ETH: {
    MAX: 40,
  },
  BTC: {
    MAX: 39,
  },
  AE: {
    MIN: 38,
    MAX: 50,
  },
};

export const getNetworkRegex = network => {
  switch (network) {
    case 'ETH':
    case 'DAI':
    case 'USDC':
    case 'WBTC':
    case 'BTC++':
    case 'AVAX':
      return `^0x[0-9a-fA-F]{${ADDRESSES_LENGTH.ETH.MAX}}$`;
    case 'BTC':
      return `^bc1[a-zA-HJ-NP-Z0-9]{${ADDRESSES_LENGTH.BTC.MAX}}$`;
    case 'AE':
      return `^ak_[a-zA-Z0-9]{${ADDRESSES_LENGTH.AE.MIN},${ADDRESSES_LENGTH.AE.MAX}}$`;
    case 'ONE':
      return `^one1[a-zA-HJ-NP-Z0-9]`;
    default:
      break;
  }
};
