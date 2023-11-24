import CITIES from "./cities";

export default class CommonService {
    static cities = CITIES;

    static getCities(): Promise<any> {
        return new Promise((resolve) => {
            resolve(this.cities);
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
