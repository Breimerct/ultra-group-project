import CITIES from "./cities";

export interface ICategoryRoom {
    id: string;
    category: string;
    tax: number;
}

const categories: ICategoryRoom[] = [
    { id: "1", category: "Individual", tax: 0.1 },
    { id: "2", category: "Doble", tax: 0.15 },
    { id: "3", category: "Suite", tax: 0.2 },
];

export default class CommonService {
    static cities = CITIES;

    static getCities(): Promise<any> {
        return new Promise((resolve) => {
            resolve(this.cities);
        });
    }

    static getCategories(): Promise<any> {
        return new Promise((resolve) => {
            resolve(categories);
        });
    }

    static getCategoryById(categoryId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const categoryFound = categories.find(
                (category) => category.id === categoryId,
            );

            if (!categoryFound) {
                reject("Categoria no encontrada");
            }

            resolve(categoryFound);
        });
    }

    static getCityById(cityId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            const cityFound = this.cities.find((city) => city.id === cityId);

            if (!cityFound) {
                reject("City not found");
            }

            resolve(cityFound);
        });
    }
}
