import { getNetworkRegex } from './addressValidation';
import { MIN_WORDS_FOR_VALID_SEED, MAX_WORDS_FOR_VALID_SEED } from '../constants';

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

export const checkIfSeedPhraseIsInvalid = btcWallet => {
  if (!btcWallet) return false;

  const seedPhrase = btcWallet.secret;

  const seedPhraseAsArray = seedPhrase.split(/\s+/).filter(word => Boolean(word));

  const currentLengthOfSeedPhrase = seedPhraseAsArray.length;

  return seedPhraseValidation(currentLengthOfSeedPhrase);
};

export const seedPhraseValidation = seedPhraseLength =>
  seedPhraseLength !== MIN_WORDS_FOR_VALID_SEED && seedPhraseLength !== MAX_WORDS_FOR_VALID_SEED;
