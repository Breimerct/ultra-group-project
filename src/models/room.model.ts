import { ICategoryRoom } from "@/types";
import { Schema, Document, model, models } from "mongoose";

// Define la interfaz para el modelo de Room
export interface RoomDocument extends Document {
    id?: string;
    name: string;
    description?: string | null;
    stars?: number;
    imageUrls: string[];
    hotelId: string;
    categoryId: string | ICategoryRoom;
    price?: number;
    isAvailable: boolean;
}

const RoomSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: null },
    stars: { type: Number },
    imageUrls: { type: [String], required: true },
    hotelId: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "CategoryRoom", required: true },
    price: { type: Number },
    isAvailable: { type: Boolean, default: true },
});

export default models.Room || model<RoomDocument>("Room", RoomSchema);
