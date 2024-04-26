import { Gender, ICompanion, IEmergencyContact } from "@/types";
import { Schema, Document, model, models } from "mongoose";

// Define la interfaz para el modelo de Booking
export interface BookingDocument extends Document {
    id?: string;
    checkIn: string;
    checkOut: string;
    roomId: string;
    userId: string;
    companions: ICompanion[];
    emergencyContact: IEmergencyContact;
}

// Define el esquema de Mongoose para Booking
const BookingSchema: Schema = new Schema({
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    companions: [
        {
            name: { type: String, required: true },
            email: { type: String, required: true },
            cellphone: { type: String, required: true },
            documentType: { type: String, required: true },
            documentNumber: { type: String, required: true },
            gender: {
                type: String,
                enum: Gender,
                default: null,
            },
        },
    ],
    emergencyContact: {
        name: { type: String, required: true },
        cellphone: { type: String, required: true },
    },
});

// Crea y exporta el modelo de Mongoose para Booking
export default models.Booking || model<BookingDocument>("Booking", BookingSchema);
