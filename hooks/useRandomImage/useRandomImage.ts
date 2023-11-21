import axios from "axios";
import { IResponseImage } from "./interfaces";

export const DEFAULT_IMAGE =
    "https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png";

const useRandomHotelImage = async (): Promise<string> => {
    try {
        const { data } = await axios.get<IResponseImage>(
            "https://api.unsplash.com/photos/random?query=hotels",
            { headers: { Authorization: process.env.CLIENT_ID } },
        );

        return data.urls.regular;
    } catch (error) {
        return DEFAULT_IMAGE;
    }
};

export default useRandomHotelImage;
