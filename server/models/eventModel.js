import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  pic: { type: String, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  time: { type: String, required: true },
  virtualLocation: { type: String, required: true },
  status: { type: String, enum: ["active", "cancelled"], default: "active" },
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const EventModel = mongoose.model("Event", eventSchema);
export default EventModel;
