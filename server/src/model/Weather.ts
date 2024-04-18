import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema(
  {
    coordinates: {
      latitude: {
        type: String,
      },
      longitude: {
        type: String,
      },
    },
    interval: { type: String, enum: ["daily", "hourly", "weekly"] },
    timestamp: { type: Date },
    temperature: { type: Number },
    feels_like: { type: Number },
    humidity: { type: Number },
    pressure: { type: Number },
    wind_speed: { type: Number },
    wind_direction: { type: String },
    precipitation: {
      type: { type: String },
      amount: { type: Number },
    },
    sunrise: { type: Date },
    sunset: { type: Date },
    sky_icon: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

const Weather = mongoose.model("Weather", weatherSchema);

export default Weather;
