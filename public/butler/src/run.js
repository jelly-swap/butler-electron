"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const server_1 = require("./server");
const utils_1 = require("./server/utils");
const task_1 = require("./components/price/task");
const task_2 = require("./components/balance/task");
const task_3 = require("./components/info/task");
const handler_1 = require("./blockchain/handler");
const logger_1 = require("./logger");
const contracts_1 = require("./blockchain/contracts");
const user_config_1 = require("../user-config");
const database_1 = require("./config/database");
const config_1 = require("./config");
const utils_2 = require("./blockchain/utils");
exports.run = (config = user_config_1.default) => {
    new config_1.default().setUserConfig(config);
    const dbConfig = database_1.default(Object.assign({ name: config.DATABASE.ACTIVE }, config.DATABASE[config.DATABASE.ACTIVE]));
    validateAddresses(config).then((result) => {
        if (result) {
            typeorm_1.createConnection(dbConfig)
                .then(() => __awaiter(void 0, void 0, void 0, function* () {
                contracts_1.default();
                yield utils_1.startTasks([new task_1.default(), new task_2.default(), new task_3.default()]);
                yield server_1.default(config.SERVER.PORT);
                yield handler_1.startHandlers();
                yield contracts_1.startEventListener();
            }))
                .catch((error) => {
                logger_1.logError(`ERROR: ${error}`);
            });
        }
    });
};
const validateAddresses = (config) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logInfo('Validating...');
    for (const network in config.WALLETS) {
        const { ADDRESS, SECRET } = config.WALLETS[network];

        if (network != 'ETH' && config.WALLETS['ETH']?.ADDRESS && utils_2.compareAddress(config.WALLETS['ETH']?.ADDRESS, ADDRESS)) {
            logger_1.logError('It is not allowed to have the same wallet for ETH and any ERC20');
            return false;
        }

        if (ADDRESS && SECRET) {
            const result = yield utils_2.PK_MATCH_ADDRESS[network](SECRET, ADDRESS);
            if (!result) {
                logger_1.logError(`The SECRET you have provided for ${network} network does not match the ADDRESS.
                    \r\n${SECRET} does not match ${ADDRESS}.
                    \r\nFix the problem and start Butler again.`);
                return false;
            }
        }
    }
    return true;
});
//# sourceMappingURL=run.js.map