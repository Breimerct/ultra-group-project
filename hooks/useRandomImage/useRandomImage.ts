import axios from "axios";
import { IResponseImage } from "./interfaces";

const useRandomHotelImage = async (): Promise<string | null> => {
    try {
        const { data } = await axios.get<IResponseImage>(
            "https://api.unsplash.com/photos/random?query=hotels",
            { headers: { Authorization: process.env.CLIENT_ID } },
        );

        return data.urls.regular;
    } catch (error) {
        return null;
    }
};

export default useRandomHotelImage;
