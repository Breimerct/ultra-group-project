import { IHotel } from "@/app/api/hotel/hotel.service";
import axios from "axios";
import { create } from "zustand";

export interface IFilterSearch {
    cityId?: number | null;
    checkIn?: string;
    checkOut?: string;
}

type State = {
    hotels: IHotel[];
    isLoadingHotels: boolean;
    hotel: IHotel | null;
    filterSearch: IFilterSearch;
};

type Actions = {
    getAllHotels: () => Promise<void>;
    getHotelById: (id: string) => Promise<void>;
    getHotelsByCityAndDate: (cityId: number | null, checkIn: string, checkOut: string) => Promise<void>;
    setFilterSearch: (filterSearch: IFilterSearch) => void;
};

const initialState: State = {
    hotels: [],
    isLoadingHotels: false,
    hotel: null,
    filterSearch: {
        cityId: null,
        checkIn: "",
        checkOut: "",
    },
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

    getHotelsByCityAndDate: async (cityId: number | null, checkIn: string, checkOut: string) => {
        set({ isLoadingHotels: true });
        set({ hotels: [] });
        try {
            const { data } = await axios.get<IHotel[]>("/api/hotel", {
                params: {
                    cityId,
                    checkIn,
                    checkOut,
                },
            });

            set({ hotels: data });
        } catch (error) {
            console.log(error);
        } finally {
            set({ isLoadingHotels: false });
        }
    },

    setFilterSearch: (filterSearch) => {
        set({ filterSearch });
    },
}));
