import { IHotel } from "@/app/api/hotel/hotel.service";
import axios from "axios";
import { create } from "zustand";

type State = {
    hotels: IHotel[];
    hotel: IHotel | null;
};

type Actions = {
    getAllHotels: () => Promise<void>;
    getHotelById: (id: string) => Promise<void>;
    getHotelByCityId: (cityId: number) => Promise<void>;
};

const initialState: State = {
    hotels: [],
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
            const response = await fetch(`/api/hotel/${id}`);
            const hotel = await response.json();

            set({ hotel });
        } catch (error) {
            console.log(error);
        }
    },
    getHotelByCityId: async (cityId) => {
        try {
            const response = await fetch(`/api/hotel/city/${cityId}`);
            const hotels = await response.json();

            set({ hotels });
        } catch (error) {
            console.log(error);
        }
    },
}));
