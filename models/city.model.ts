import { Schema, Document, model, models } from "mongoose";

export interface CityDocument extends Document {
    id: number;
    name: string;
    description: string;
    surface: number | null;
    population: number | null;
    postalCode: null | string;
    departmentId: number;
    department: null;
    touristAttractions: null;
    presidents: null;
    indigenousReservations: null;
    airports: null;
}

const CitySchema: Schema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    surface: { type: Number, default: null },
    population: { type: Number, default: null },
    postalCode: { type: String, default: null },
    departmentId: { type: Number, required: true },
    department: { type: String, default: null },
    touristAttractions: { type: String, default: null },
    presidents: { type: String, default: null },
    indigenousReservations: { type: String, default: null },
    airports: { type: String, default: null },
});

export default models.City || model<CityDocument>("City", CitySchema);
