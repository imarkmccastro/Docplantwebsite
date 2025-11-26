import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthUser {
  id: number;
  email: string;
}

export function authRequired(req: Request & { user?: AuthUser }, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'missing-authorization' });
  }
  const token = header.slice('Bearer '.length);
  try {
    const secret = process.env.JWT_SECRET || 'dev-secret';
    const decoded: any = jwt.verify(token, secret);
    req.user = { id: decoded.sub, email: decoded.email };
    next();
  } catch (e: any) {
    return res.status(401).json({ error: 'invalid-token' });
  }
}

export function adminOnly(req: Request & { user?: AuthUser }, res: Response, next: NextFunction) {
  if (!req.user) return res.status(401).json({ error: 'unauthorized' });
  if (req.user.email !== 'admin@docplant.com') return res.status(403).json({ error: 'forbidden' });
  next();
}
