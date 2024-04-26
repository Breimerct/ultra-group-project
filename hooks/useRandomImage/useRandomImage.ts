import axios from "axios";
import { IResponseImage } from "./interfaces";

export const DEFAULT_IMAGE =
    "https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png";

const generateRandomImages = async (
    returnArray: boolean = false,
    count: number = 0,
): Promise<string | string[]> => {
    try {
        const endpoint = "https://api.unsplash.com/photos/random";
        const headers = { Authorization: process.env.CLIENT_ID };
        const params = returnArray ? { count, query: "hotels-rooms" } : { query: "hotels" };

        if (returnArray && count) {
            const { data } = await axios.get<IResponseImage[]>(endpoint, {
                headers,
                params,
            });

            return data.map((img) => img.urls.regular);
        }

        const { data } = await axios.get<IResponseImage>(endpoint, {
            headers,
            params,
        });

        return data.urls.regular;
    } catch (error: Error | any) {
        return DEFAULT_IMAGE;
    }
};

export default generateRandomImages;
