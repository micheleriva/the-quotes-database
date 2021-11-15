"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
require('dotenv').config();
const app = (0, express_1.default)();
const port = process.env.NODE_PORT || 3000;
/**
 * @function start
 * @returns {void}
 * @description Starts the HTTP Express server.
 */
function start() {
    app.use((0, cors_1.default)())
        .use(express_1.default.urlencoded({ extended: false }))
        .use(express_1.default.json())
        .use('/quotes', routes_1.quotes)
        .use((_req, res) => res.status(404).json({ success: false, error: 'Route not found' }))
        .listen(port, () => console.log(`Server ready on port ${port}`));
}
exports.start = start;
