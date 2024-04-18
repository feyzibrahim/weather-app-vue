import mongoose from "mongoose";

const { Schema, model } = mongoose;

const placeSchema = new Schema(
  {
    place_name: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    country: { type: String, required: true },
    coordinates: {
      latitude: {
        type: String,
      },
      longitude: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const Place = model("Place", placeSchema);

export default Place;
