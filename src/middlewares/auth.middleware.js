import { verifyJwt } from '../utils/jwt.js';

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    req.user = verifyJwt(token);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}