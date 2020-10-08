export const safeAccess = (object, path) => {
  return object
    ? path.reduce(
        (accumulator, currentValue) => (accumulator && accumulator[currentValue] ? accumulator[currentValue] : null),
        object,
      )
    : null;
};

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
    case 'BTC':
      return `^bc1[a-zA-HJ-NP-Z0-9]{${ADDRESSES_LENGTH.BTC.MAX}}$`;
    case 'AE':
      return `^ak_[a-zA-Z0-9]{${ADDRESSES_LENGTH.AE.MIN},${ADDRESSES_LENGTH.AE.MAX}}$`;
    case 'ONE':
      return `^one1[a-zA-HJ-NP-Z0-9]`;
    default:
      return `^0x[0-9a-fA-F]{${ADDRESSES_LENGTH.ETH.MAX}}$`;
  }
};

export const validateAddress = (asset, address) => {
  if (!new RegExp(getNetworkRegex(asset)).test(address)) {
    return true;
  }
};
