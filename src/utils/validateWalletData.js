import { getNetworkRegex } from './addressValidation';
import { ERC20_TOKENS, MIN_WORDS_FOR_VALID_SEED, MAX_WORDS_FOR_VALID_SEED } from '../constants';

export const checkIfSecretIsMissing = wallets => {
  for (const wallet in wallets) {
    if (!wallets[wallet].secret) {
      return true;
    }
  }
};

export const checkIfAddressessDoNotMatchRegex = wallets => {
  for (const wallet in wallets) {
    if (!new RegExp(getNetworkRegex(wallet)).test(wallets[wallet].address)) {
      return true;
    }
  }
};

export const checkIfETHSecretMatchERC20Secret = (wallets, setERC20InvalidSecret) => {
  const ethWallet = wallets?.ETH;

  if (ethWallet) {
    const { secret } = ethWallet;

    for (const token in ERC20_TOKENS) {
      if (wallets[token]?.secret?.length && wallets[token].secret === secret) {
        setERC20InvalidSecret(tokens => ({
          ...tokens,
          [token]: true,
        }));
        return true;
      } else {
        setERC20InvalidSecret(tokens => ({
          ...tokens,
          [token]: false,
        }));
      }
    }
  }
};

export const checkIfETHAddressMatchERC20Address = (wallets, setERC20InvalidAddress) => {
  const ethWallet = wallets?.ETH;

  if (ethWallet) {
    const { address } = ethWallet;

    for (const token in ERC20_TOKENS) {
      if (wallets[token]?.address?.length && wallets[token].address === address) {
        setERC20InvalidAddress(tokens => ({
          ...tokens,
          [token]: true,
        }));

        return true;
      } else {
        setERC20InvalidAddress(tokens => ({
          ...tokens,
          [token]: false,
        }));
      }
    }
  }
};

export const checkIfSeedPhraseIsInvalid = btcWallet => {
  if (!btcWallet) return false;

  const seedPhrase = btcWallet.secret;

  const seedPhraseAsArray = seedPhrase.split(/\s+/).filter(word => Boolean(word));

  const currentLengthOfSeedPhrase = seedPhraseAsArray.length;

  return seedPhraseValidation(currentLengthOfSeedPhrase);
};

export const seedPhraseValidation = seedPhraseLength =>
  seedPhraseLength !== MIN_WORDS_FOR_VALID_SEED && seedPhraseLength !== MAX_WORDS_FOR_VALID_SEED;
