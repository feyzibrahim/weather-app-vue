import express from "express";
import {
  createPlace,
  createPlacesBatch,
  deletePlace,
  getAllPlaces,
  getPlaceById,
  searchPlace,
  updatePlace,
} from "../controller/PlaceController";

const placeRouter = express.Router();

placeRouter.get("/", getAllPlaces);
placeRouter.get("/search", searchPlace);
placeRouter.get("/:id", getPlaceById);
placeRouter.delete("/:id", deletePlace);
placeRouter.patch("/:id", updatePlace);
placeRouter.post("/", createPlace);
placeRouter.post("/batch", createPlacesBatch);

export default placeRouter;
