import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const url = process.env.FRONTEND_URL ?? "";
const app: Application = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [url],
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log("Server Started on:", process.env.PORT);
});
