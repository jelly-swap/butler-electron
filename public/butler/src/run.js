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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const server_1 = __importDefault(require("./server"));
const utils_1 = require("./server/utils");
const task_1 = __importDefault(require("./components/price/task"));
const task_2 = __importDefault(require("./components/balance/task"));
const task_3 = __importDefault(require("./components/info/task"));
const handler_1 = require("./blockchain/handler");
const logger_1 = require("./logger");
const contracts_1 = __importDefault(require("./blockchain/contracts"));
const tracker_1 = __importDefault(require("./tracker"));
const user_config_1 = __importDefault(require("../user-config"));
const database_1 = __importDefault(require("./config/database"));
const config_1 = __importDefault(require("./config"));
const utils_2 = require("./blockchain/utils");
const run = (config = user_config_1.default, combinedFile, errorFile) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.setLoggerConfig(combinedFile, errorFile);
        new config_1.default().setUserConfig(config);
        const dbConfig = database_1.default(Object.assign({ name: config.DATABASE.ACTIVE }, config.DATABASE[config.DATABASE.ACTIVE]));
        const isValid = yield validateAddresses(config);
        if (isValid) {
            yield typeorm_1.createConnection(dbConfig);
            contracts_1.default();
            yield utils_1.startTasks([new task_1.default(), new task_2.default(), new task_3.default()]);
            yield server_1.default(config.SERVER.PORT);
            yield handler_1.startHandlers();
            yield tracker_1.default(config);
            return true;
        }
        return false;
    }
    catch (error) {
        logger_1.logError(`${error}`);
        logger_1.logDebug(`${error}`, JSON.stringify(error));
        return false;
    }
});
exports.run = run;
const validateAddresses = (config) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logData('Validating...');
    for (const network in config.WALLETS) {
        const { ADDRESS, SECRET } = config.WALLETS[network];
        if (ADDRESS && SECRET) {
            try {
                const result = yield utils_2.PK_MATCH_ADDRESS[network](SECRET, ADDRESS);
                if (!result) {
                    logger_1.logError(`The SECRET you have provided for ${network} network does not match the ADDRESS.
                    \r\n${SECRET} does not match ${ADDRESS}.
                    \r\nFix the problem and start Butler again.`);
                    return false;
                }
            }
            catch (error) {
                logger_1.logError(`Invalid Address or Private Key for ${network} network.`);
                return false;
            }
        }
    }
    return true;
});
