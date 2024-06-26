import { Gender, Role } from "@/types";
import { Schema, Document, model, models } from "mongoose";

export interface UserDocument extends Document {
    id?: string;
    name: string;
    email: string;
    cellphone: string;
    avatar?: string;
    password?: string;
    role?: string;
    gender?: Gender | string | null;
    documentType?: string;
    documentNumber?: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cellphone: { type: String, required: true },
    avatar: { type: String },
    password: { type: String, required: true },
    role: { type: String, default: Role.User },
    gender: { type: String, enum: Gender, default: null },
    documentType: { type: String, required: true },
    documentNumber: { type: String, required: true },
});

export default models.User || model<UserDocument>("User", UserSchema);
