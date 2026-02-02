"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("./db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
function signToken(payload) {
    const secret = process.env.JWT_SECRET || 'dev-secret';
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '7d' });
}
router.post('/register', async (req, res) => {
    const { email, password, name } = req.body || {};
    if (!email || !password) {
        return res.status(400).json({ error: 'email-and-password-required' });
    }
    try {
        const [rows] = await db_1.pool.query('SELECT id FROM users WHERE email = ?', [email]);
        // @ts-ignore
        if (rows.length)
            return res.status(409).json({ error: 'email-already-exists' });
        const hash = await bcryptjs_1.default.hash(password, 10);
        const [result] = await db_1.pool.query('INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)', [email, hash, name || null]);
        // @ts-ignore
        const userId = result.insertId;
        const token = signToken({ sub: userId, email });
        res.json({ token, user: { id: userId, email, name: name || null } });
    }
    catch (e) {
        res.status(500).json({ error: e?.message || 'register-failed' });
    }
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
        return res.status(400).json({ error: 'email-and-password-required' });
    }
    try {
        const [rows] = await db_1.pool.query('SELECT id, password_hash, name FROM users WHERE email = ?', [email]);
        // @ts-ignore
        if (!rows.length)
            return res.status(401).json({ error: 'invalid-credentials' });
        // @ts-ignore
        const user = rows[0];
        const ok = await bcryptjs_1.default.compare(password, user.password_hash);
        if (!ok)
            return res.status(401).json({ error: 'invalid-credentials' });
        const token = signToken({ sub: user.id, email });
        res.json({ token, user: { id: user.id, email, name: user.name || null } });
    }
    catch (e) {
        res.status(500).json({ error: e?.message || 'login-failed' });
    }
});
exports.default = router;
