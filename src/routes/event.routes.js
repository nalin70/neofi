import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { createEvent, getEvents } from '../controllers/event.controller.js';

const router = express.Router();

router.post('/', authenticate, createEvent);
router.get('/', authenticate, getEvents);

export default router;