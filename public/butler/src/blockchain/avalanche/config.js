'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const avalanche_1 = require('@jelly-swap/avalanche');
const config_1 = __importDefault(require('../../config'));
const utils_1 = require('../../utils');
exports.default = () => {
  const userConfig = new config_1.default().getUserConfig();
  const address = utils_1.safeAccess(userConfig, ['WALLETS', 'AVAX', 'ADDRESS']);
  const secret = utils_1.safeAccess(userConfig, ['WALLETS', 'AVAX', 'SECRET']);
  const config = Object.assign(Object.assign({}, avalanche_1.Config(7200)), {
    explorer: 'https://cchain.explorer.avax.network/tx/',
    providerUrl: 'https://ava.spacejelly.network/api/ext/bc/C/rpc',
    contractAddress: '0x640440c1A691dC824C89f92A856848A9013D3784',
    chainId: 43114,
    REFUND_PERIOD: 10,
    VALID_EXPIRATION: 72000,
  });
  if (address && secret) {
    return Object.assign(Object.assign({}, config), { receiverAddress: address, PRIVATE_KEY: secret });
  } else {
    throw new Error('AVAX ADDRESS and SECRET are missing.');
  }
};
