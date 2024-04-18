import express from "express";
import {
  createWeather,
  createWeatherBatch,
  deleteWeather,
  getAllWeather,
  getWeatherByCoordinates,
  getWeatherById,
  updateWeather,
} from "../controller/WeatherController";

const weatherRouter = express.Router();

weatherRouter.get("/", getAllWeather);
weatherRouter.get("/lat-lon", getWeatherByCoordinates);
weatherRouter.get("/:id", getWeatherById);

weatherRouter.delete("/:id", deleteWeather);
weatherRouter.patch("/:id", updateWeather);
weatherRouter.post("/", createWeather);
weatherRouter.post("/batch", createWeatherBatch);

export default weatherRouter;
