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
exports.applyRoutes = exports.applyMiddleware = exports.startTasks = void 0;
const logger_1 = require("../logger");
exports.startTasks = (tasks) => __awaiter(void 0, void 0, void 0, function* () {
    for (const t of tasks) {
        logger_1.logInfo(`Starting task: ${t.name}`);
        yield t.start();
    }
});
exports.applyMiddleware = (middlewareWrappers, router) => {
    for (const wrapper of middlewareWrappers) {
        wrapper(router);
    }
};
exports.applyRoutes = (routes, router) => {
    routes.forEach(route => {
        const { method, controller, action } = route;
        router[method](route.route, (req, res, next) => {
            const result = new controller()[action](req, res, next);
            if (result instanceof Promise) {
                result.then(innerResult => innerResult !== null && innerResult !== undefined
                    ? res.send(innerResult)
                    : undefined);
            }
            else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
};
//# sourceMappingURL=utils.js.map