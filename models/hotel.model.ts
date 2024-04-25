import { Schema, Document, model, models } from "mongoose";

export interface HotelDocument extends Document {
    id?: string;
    name: string;
    description?: string | null;
    stars?: number | null;
    imageUrl: string;
    cityId: number;
    isAvailable: boolean;
}

const HotelSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: null },
    stars: { type: Number, default: null },
    imageUrl: { type: String, required: true },
    cityId: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
});

export default models.Hotel || model<HotelDocument>("Hotel", HotelSchema);
