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
const express = require("express");
const http = require("http");
const utils_1 = require("./utils");
const middleware_1 = require("./middleware");
const routes_1 = require("./routes");
const logger_1 = require("../logger");
exports.default = (port = process.env.PORT || 8080) => __awaiter(void 0, void 0, void 0, function* () {
    const router = express();
    utils_1.applyMiddleware(middleware_1.default, router);
    utils_1.applyRoutes(routes_1.Routes, router);
    const server = http.createServer(router);
    server.listen(port, () => {
        logger_1.logInfo(`Server started on port ${server.address().port}`);
    });
});
//# sourceMappingURL=index.js.map