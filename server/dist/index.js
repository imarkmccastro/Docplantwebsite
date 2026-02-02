"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
const products_1 = __importDefault(require("./products"));
const auth_1 = __importDefault(require("./auth"));
const cart_1 = __importDefault(require("./cart"));
const orders_1 = __importDefault(require("./orders"));
dotenv_1.default.config({ path: process.env.DOTENV_PATH || undefined });
const app = (0, express_1.default)();
const allowed = (process.env.CORS_ORIGINS || 'http://localhost:3000,http://localhost:3001,http://localhost:5173')
    .split(',')
    .map(s => s.trim());
app.use((0, cors_1.default)({ origin: allowed }));
app.use(express_1.default.json());
app.get('/health', async (_req, res) => {
    try {
        await (0, db_1.testConnection)();
        res.json({ ok: true });
    }
    catch (e) {
        res.status(500).json({ ok: false, error: e?.message || 'db-error' });
    }
});
app.use('/products', products_1.default);
app.use('/auth', auth_1.default);
app.use('/cart', cart_1.default);
app.use('/orders', orders_1.default);
const port = Number(process.env.PORT || 4001);
// Probe DB connection on startup (non-fatal)
(0, db_1.testConnection)()
    .then(() => console.log('DB connection: OK'))
    .catch((e) => console.error('DB connection: FAILED ->', e?.message || e));
console.log('CORS allowed origins:', allowed.join(', '));
console.log('Starting API on port', port);
app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});
