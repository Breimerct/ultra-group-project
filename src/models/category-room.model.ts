import { Schema, Document, models, model } from "mongoose";

// Define la interfaz para el modelo de CategoryRoom
export interface ICategoryRoom extends Document {
    id: string;
    category: string;
    tax: number;
}

// Define el esquema de Mongoose para CategoryRoom
const CategoryRoomSchema: Schema = new Schema({
    id: { type: String, required: true },
    category: { type: String, required: true },
    tax: { type: Number, required: true },
});

// Crea y exporta el modelo de Mongoose para CategoryRoom
export default models.CategoryRoom ||
    model<ICategoryRoom>("CategoryRoom", CategoryRoomSchema);
