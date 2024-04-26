import { validateMongoId } from "@/helpers/util";
import categoryRoomModel from "@/models/category-room.model";
import cityModel from "@/models/city.model";
import { ICategoryRoom, ICity } from "@/types";

export async function getCities(): Promise<ICity[]> {
    const cities = await cityModel.find().lean<ICity[]>();

    return cities;
}

export async function getCategories(): Promise<ICategoryRoom[]> {
    const roomCategories = await categoryRoomModel.find().lean<ICategoryRoom[]>();

    return roomCategories;
}

export async function getCategoryById(categoryId: string): Promise<any> {
    await validateMongoId(categoryId);
    const categoryFound = await categoryRoomModel.findById(categoryId);

    if (!categoryFound) {
        throw new Error("Categoria no encontrada");
    }

    return categoryFound;
}

export async function getCityById(cityId: number): Promise<any> {
    const cityFound = await cityModel.findOne({ id: cityId });

    if (!cityFound) {
        throw new Error("Ciudad no encontrada");
    }

    return cityFound;
}
