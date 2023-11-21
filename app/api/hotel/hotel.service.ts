import useRandomHotelImage, {
    DEFAULT_IMAGE,
} from "@/hooks/useRandomImage/useRandomImage";

export interface IHotel {
    id?: string;
    name: string;
    description?: string | null;
    stars?: number;
    imageUrl: string;
    cityId: number;
}

export class HotelService {
    static hotels: IHotel[] = [
        {
            id: crypto.randomUUID(),
            name: "Hotel 1",
            description: "Description 1",
            stars: 3,
            imageUrl: DEFAULT_IMAGE,
            cityId: 1,
        },
        {
            id: crypto.randomUUID(),
            name: "Hotel 2",
            description: "Description 2",
            stars: 4,
            imageUrl: DEFAULT_IMAGE,
            cityId: 1,
        },
        {
            id: crypto.randomUUID(),
            name: "Hotel 3",
            description: "Description 3",
            stars: 5,
            imageUrl: DEFAULT_IMAGE,
            cityId: 1,
        },
    ];

    static getHotels(): Promise<IHotel[]> {
        return new Promise((resolve) => {
            resolve(this.hotels);
        });
    }

    static getHotelsByCityId(cityId: number): Promise<IHotel[]> {
        return new Promise((resolve, reject) => {
            const hotels = this.hotels.filter(
                (hotel) => hotel.cityId === cityId,
            );

            if (!hotels.length) {
                reject("No se encuentran hoteles para esta ciudad");
                return;
            }

            resolve(hotels);
        });
    }

    static createHotel(hotel: IHotel): Promise<IHotel> {
        return new Promise(async (resolve, reject) => {
            const existedHotel = this.hotels.some(
                (item) => item.name.toLowerCase() === hotel.name.toLowerCase(),
            );

            if (existedHotel) {
                reject("Este hotel ya existe");
                return;
            }

            if (hotel.stars && hotel.stars > 5) {
                reject("Solo se permiten 5 estrellas como máximo");
                return;
            }

            const id = crypto.randomUUID();
            const imageUrl = await useRandomHotelImage();
            const newHotel: IHotel = {
                ...hotel,
                id,
                stars: hotel.stars || 0,
                imageUrl,
            };

            this.hotels.push(newHotel);
            resolve(newHotel);
        });
    }
}
