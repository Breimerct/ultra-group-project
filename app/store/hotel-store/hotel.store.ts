import { IHotel } from "@/app/api/hotel/hotel.service";
import axios from "axios";
import { create } from "zustand";

type State = {
    hotels: IHotel[];
    isLoadingHotels: boolean;
    hotel: IHotel | null;
};

type Actions = {
    getAllHotels: () => Promise<void>;
    getHotelById: (id: string) => Promise<void>;
    getHotelsByCityAndDate: (
        cityId: number | null,
        checkDate: string,
    ) => Promise<void>;
};

const initialState: State = {
    hotels: [],
    isLoadingHotels: false,
    hotel: null,
};

export const useHotelStore = create<State & Actions>((set) => ({
    ...initialState,
    getAllHotels: async () => {
        try {
            const { data } = await axios<IHotel[]>("/api/hotel");

            set({ hotels: data });
        } catch (error) {
            console.log(error);
        }
    },
    getHotelById: async (id) => {
        try {
            set({ hotel: null });
            const response = await fetch(`/api/hotel/${id}`);
            const hotel = await response.json();

            set({ hotel });
        } catch (error) {
            console.log(error);
        }
    },

    getHotelsByCityAndDate: async (
        cityId: number | null,
        checkDate: string,
    ) => {
        set({ isLoadingHotels: true });
        set({ hotels: [] });
        try {
            const { data } = await axios.get<IHotel[]>("api/hotel", {
                params: {
                    cityId,
                    checkDate,
                },
            });

            set({ hotels: data });
        } catch (error) {
            console.log(error);
        } finally {
            set({ isLoadingHotels: false });
        }
    },
}));
