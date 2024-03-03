import asyncHandler from "express-async-handler";
import EventModel from "../models/eventModel.js";

//@description     Get all events
//@route           GET /api/events/
//@access          Public
const allEvents = asyncHandler(async (req, res) => {
  const events = await EventModel.find()
    .populate("host", "-password")
    .populate("participants", "-password");
  res.json(events);
});

//@description     Create new event
//@route           POST /api/events/new
//@access          Protected
const createEvent = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    date,
    time,
    virtualLocation,
    status,
    pic,
    category,
  } = req.body;
  const hostId = req.user._id;
  const newEvent = await EventModel.create({
    title,
    description,
    date,
    time,
    virtualLocation,
    host: hostId,
    status,
    pic,
    category,
    participants: [],
  });
  if (newEvent) {
    res.status(201).json(newEvent);
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});

//@description     Update event
//@route           POST /api/events/:id
//@access          Protected
const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const eventDoc = await EventModel.findById(id);
  if (!eventDoc) {
    res.status(404);
    throw new Error("Event not found");
  }
  if (req.user._id.toString() === eventDoc.host.toString()) {
    const {
      title,
      description,
      date,
      time,
      virtualLocation,
      status,
      category,
    } = req.body;
    eventDoc.set({
      title,
      description,
      date,
      time,
      virtualLocation,
      status,
      category,
    });
    await eventDoc.save();
    res.status(200).json(eventDoc);
  } else {
    res.status(403);
    throw new Error("You are not authorized to update this event");
  }
});

//@description     Participate event
//@route           POST /api/events/participate/:id
//@access          Protected
const participateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const event = await EventModel.findById(id);
  if (!event) {
    res.status(404);
    throw new Error("Event not Found");
  }

  if (event.participants.includes(req.user._id)) {
    res.status(400);
    throw new Error("User is already a participant");
  }

  if (event.host.toString() === req.user._id.toString()) {
    res.status(400);
    throw new Error("User is the host");
  }

  event.participants.push(req.user._id);
  await event.save();

  req.user.rsvps.push(id);
  await req.user.save();
  res.json(event);
});

//@description     Get single event
//@route           POST /api/events/:id
//@access          Protected
const getSingleEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const event = await EventModel.findById(id)
    .populate("host", "-password")
    .populate("participants", "-password");
  res.json(event);
});

export {
  allEvents,
  createEvent,
  updateEvent,
  participateEvent,
  getSingleEvent,
};
