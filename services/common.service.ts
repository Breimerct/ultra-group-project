import { validateMongoId } from "@/helpers/util";
import connectDB from "@/lib/mongo";
import categoryRoomModel from "@/models/category-room.model";
import cityModel from "@/models/city.model";
import { ICategoryRoom, ICity } from "@/types";

export async function getCities(): Promise<ICity[]> {
    try {
        await connectDB();
        const cities = await cityModel.find().lean<ICity[]>();

        return cities;
    } catch (error: Error | any) {
        throw new Error(error);
    }
}

export async function getCategories(): Promise<ICategoryRoom[]> {
    try {
        await connectDB();
        const roomCategories = await categoryRoomModel.find().lean<ICategoryRoom[]>();

        return roomCategories;
    } catch (error: Error | any) {
        throw new Error(error);
    }
}

export async function getCategoryById(categoryId: string): Promise<any> {
    try {
        await Promise.all([connectDB(), validateMongoId(categoryId)]);
        const categoryFound = await categoryRoomModel.findById(categoryId);

        if (!categoryFound) {
            throw new Error("Categoria no encontrada");
        }

        return categoryFound;
    } catch (error: Error | any) {
        throw new Error(error);
    }
}

export async function getCityById(cityId: number): Promise<any> {
    try {
        await connectDB();
        const cityFound = await cityModel.findOne({ id: cityId });

        if (!cityFound) {
            throw new Error("Ciudad no encontrada");
        }

        return cityFound;
    } catch (error: Error | any) {
        throw new Error(error);
    }
}
