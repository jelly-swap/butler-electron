"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const run_1 = require("./run");
const config = process.argv[2];
// Electron fork
if (config) {
    run_1.run(JSON.parse(config));
}
else {
    run_1.run();
}
//# sourceMappingURL=index.js.map