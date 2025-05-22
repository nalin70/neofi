import { Event, EventPermission } from '../models/index.js';

export async function createEvent(req, res) {
  const { title, description, startTime, endTime, location, isRecurring, recurrencePattern } = req.body;
  const event = await Event.create({
    title, description, startTime, endTime, location, isRecurring, recurrencePattern, ownerId: req.user.id
  });
  await EventPermission.create({ eventId: event.id, userId: req.user.id, role: 'Owner' });
  res.status(201).json(event);
}

export async function getEvents(req, res) {
  const permissions = await EventPermission.findAll({ where: { userId: req.user.id } });
  const eventIds = permissions.map(p => p.eventId);
  const events = await Event.findAll({ where: { id: eventIds } });
  res.json(events);
}