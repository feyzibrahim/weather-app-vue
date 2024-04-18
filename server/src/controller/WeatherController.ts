import { Request, Response } from "express";
import Weather from "../model/Weather";

// Create new weather records
export async function createWeather(req: Request, res: Response) {
  try {
    const weatherData = req.body;
    const newWeather = await Weather.create(weatherData);
    res.status(201).json(newWeather);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

// Create new weather records (batch)
export async function createWeatherBatch(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const weatherDataArray = req.body;
    const createdWeather = await Weather.insertMany(weatherDataArray);
    res.status(201).json(createdWeather);
  } catch (error: any) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

// Get all weather records
export async function getAllWeather(req: Request, res: Response) {
  try {
    const allWeather = await Weather.find();
    res.json(allWeather);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

// Get weather record by ID
export async function getWeatherById(req: Request, res: Response) {
  try {
    const weather = await Weather.findById(req.params.id);
    if (!weather) {
      return res.status(404).json({ message: "Weather not found" });
    }
    res.json(weather);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

// Update weather record by ID
export async function updateWeather(req: Request, res: Response) {
  try {
    const updatedWeather = await Weather.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedWeather) {
      return res.status(404).json({ message: "Weather not found" });
    }
    res.json(updatedWeather);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

// Delete weather record by ID
export async function deleteWeather(req: Request, res: Response) {
  try {
    const deletedWeather = await Weather.findByIdAndDelete(req.params.id);
    if (!deletedWeather) {
      return res.status(404).json({ message: "Weather not found" });
    }
    res.json({ message: "Weather deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

// Get weather record by latitude and longitude

export const getWeatherByCoordinates = async (req: Request, res: Response) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      throw Error(
        "Latitude and longitude are required in the query parameters."
      );
    }

    const hourly = await Weather.find({
      "coordinates.latitude": latitude,
      "coordinates.longitude": longitude,
      interval: "hourly",
    });

    const daily = await Weather.find({
      "coordinates.latitude": latitude,
      "coordinates.longitude": longitude,
      interval: "daily",
    });

    if (!hourly || hourly.length === 0) {
      throw Error("Weather data not found for the provided coordinates.");
    }

    const currentWeather = await Weather.findOne({
      "coordinates.latitude": latitude,
      "coordinates.longitude": longitude,
      interval: "hourly",
      timestamp: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
    }).sort({ timestamp: 1 });

    res.status(200).json({ hourly, current: currentWeather, daily });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
