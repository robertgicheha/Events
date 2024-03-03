import express from "express";
import {
  allEvents,
  createEvent,
  participateEvent,
  updateEvent,
  getSingleEvent,
} from "../controllers/eventControllers.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(allEvents);
router.route("/:id").get(getSingleEvent);
router.route("/new").post(protect, createEvent);
router.route("/edit/:id").put(protect, updateEvent);
router.route("/participate/:id").post(protect, participateEvent);

export default router;
