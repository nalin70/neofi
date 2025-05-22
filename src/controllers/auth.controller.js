import bcrypt from 'bcrypt';
import { User } from '../models/index.js';
import { signJwt } from '../utils/jwt.js';

export async function register(req, res) {
  const { username, email, password } = req.body;
  const existing = await User.findOne({ where: { email } });
  if (existing) return res.status(400).json({ message: 'Email already registered' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, passwordHash });
  const token = signJwt({ id: user.id, email: user.email });
  res.json({ user: { id: user.id, username, email }, token });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
  const token = signJwt({ id: user.id, email: user.email });
  res.json({ user: { id: user.id, username: user.username, email }, token });
}