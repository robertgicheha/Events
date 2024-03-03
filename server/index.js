import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 5000;

/* Middlewares */
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    // origin: "https://invite-app-ten.vercel.app",
    origin: "http://localhost:5173",
    sameSite: "None",
    secure: true,
  })
);

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
  res.json("test ok");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
