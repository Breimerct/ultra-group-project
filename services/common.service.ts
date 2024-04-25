import connectDB from "@/lib/mongo";
import categoryRoomModel from "@/models/category-room.model";
import cityModel from "@/models/city.model";
import { ICategoryRoom, ICity } from "@/types";

export function getCities(): Promise<ICity[]> {
    connectDB();
    return new Promise(async (resolve, reject) => {
        const cities = await cityModel.find().catch(reject);

        resolve(cities as ICity[]);
    });
}

export function getCategories(): Promise<ICategoryRoom[]> {
    connectDB();
    return new Promise(async (resolve, reject) => {
        const roomCategories = await categoryRoomModel.find().catch(reject);

        resolve(roomCategories as ICategoryRoom[]);
    });
}

export function getCategoryById(categoryId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        const categoryFound = await categoryRoomModel.findById(categoryId).catch(reject);

        if (!categoryFound) {
            reject("Categoria no encontrada");
        }

        resolve(categoryFound);
    });
}

export function getCityById(cityId: number): Promise<any> {
    connectDB();
    return new Promise(async (resolve, reject) => {
        const cityFound = await cityModel.findOne({ id: cityId }).catch(reject);

        if (!cityFound) {
            reject("City not found");
        }

        resolve(cityFound);
    });
}
