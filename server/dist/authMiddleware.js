"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRequired = authRequired;
exports.adminOnly = adminOnly;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authRequired(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'missing-authorization' });
    }
    const token = header.slice('Bearer '.length);
    try {
        const secret = process.env.JWT_SECRET || 'dev-secret';
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = { id: decoded.sub, email: decoded.email };
        next();
    }
    catch (e) {
        return res.status(401).json({ error: 'invalid-token' });
    }
}
function adminOnly(req, res, next) {
    if (!req.user)
        return res.status(401).json({ error: 'unauthorized' });
    if (req.user.email !== 'admin@docplant.com')
        return res.status(403).json({ error: 'forbidden' });
    next();
}
