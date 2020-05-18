"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_1 = require("../entity/sql");
const mongo_1 = require("../entity/mongo");
exports.default = (options) => {
    switch (options.name) {
        case 'SQLITE': {
            return Object.assign({ type: 'sqlite', database: options.database || 'butler.sqlite', entities: sql_1.default, cli: { entitiesDir: '/src/entities/sql/' } }, commonConfig);
        }
        case 'MONGODB': {
            return Object.assign({ type: 'mongodb', url: process.env.MONGODB_URI || options.URL || 'mongodb://db:27017/butler', entities: mongo_1.default, cli: { entitiesDir: '/src/entities/mongo/' }, authSource: process.env.DB_USER || options.AUTH || 'admin', password: process.env.MONGO_PASSWORD || options.MONGO_PASSWORD || 'admin' }, commonConfig);
        }
    }
};
const commonConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    logging: false,
    synchronize: true,
};
//# sourceMappingURL=database.js.map