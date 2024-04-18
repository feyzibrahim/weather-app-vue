import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import weatherRouter from "./routes/weatherRoute";
import mongoose from "mongoose";
import placeRouter from "./routes/placeRoute";
import morgan from "morgan";

const url = process.env.FRONTEND_URL ?? "";
const app: Application = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [url],
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true,
  })
);

app.use("/api/weather", weatherRouter);
app.use("/api/place", placeRouter);

mongoose
  .connect(process.env.DATABASE_CONNECTION_URI ?? "")
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on Port: ${process.env.PORT} - DB Connected`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
