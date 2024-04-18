import { Request, Response } from "express";
import Place from "../model/Place";

// Create a new place
export async function createPlace(req: Request, res: Response): Promise<void> {
  try {
    const placeData = req.body;
    const newPlace = await Place.create(placeData);
    res.status(201).json(newPlace);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

// Batch insert places
export async function createPlacesBatch(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const placesData = req.body;

    const createdPlaces = await Place.insertMany(placesData);
    res.status(201).json(createdPlaces);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

// Get all places
export async function getAllPlaces(req: Request, res: Response): Promise<void> {
  try {
    const allPlaces = await Place.find();
    res.json(allPlaces);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

// Get place by ID
export async function getPlaceById(req: Request, res: Response): Promise<void> {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      throw Error("Not found");
    }
    res.json(place);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

// Update place by ID
export async function updatePlace(req: Request, res: Response): Promise<void> {
  try {
    const updatedPlace = await Place.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPlace) {
      throw Error("Not found");
    }
    res.json(updatedPlace);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

// Delete place by ID
export async function deletePlace(req: Request, res: Response): Promise<void> {
  try {
    const deletedPlace = await Place.findByIdAndDelete(req.params.id);
    if (!deletedPlace) {
      throw Error("Not found");
    }
    res.json({ message: "Place deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function searchPlace(req: Request, res: Response): Promise<void> {
  try {
    const query: string = req.query.q as string;

    const places = await Place.find({
      $or: [
        { place_name: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { state: { $regex: query, $options: "i" } },
        { country: { $regex: query, $options: "i" } },
      ],
    });

    const result = places.map((place) => {
      return {
        place_name: `${place.place_name}, ${place.city}, ${place.state}, ${place.country}`,
        id: place._id,
        coordinates: place.coordinates,
      };
    });

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
