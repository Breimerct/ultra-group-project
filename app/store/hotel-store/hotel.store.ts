import { IHotel } from "@/app/api/hotel/hotel.service";
import axios from "axios";
import { create } from "zustand";

export interface IRangedDate {
    checkIn?: string | null;
    checkOut?: string | null;
}

export interface IFilterSearch extends IRangedDate {
    cityId?: number | null;
}

type State = {
    hotels: IHotel[];
    isLoadingHotels: boolean;
    hotel: IHotel | null;
    filterSearch: IFilterSearch;
};

type Actions = {
    getAllHotels: () => Promise<void>;
    // eslint-disable-next-line no-unused-vars
    getHotelById: (id: string) => Promise<void>;
    // eslint-disable-next-line no-unused-vars
    getHotelsByCityAndDate: (cityId: number | null, checkIn: string | null, checkOut: string | null) => Promise<void>;
    // eslint-disable-next-line no-unused-vars
    setFilterSearch: (filterSearch: IFilterSearch) => void;
    // eslint-disable-next-line no-unused-vars
    updateHotelById: (id: string, body: Partial<IHotel>) => Promise<void>;
    // eslint-disable-next-line no-unused-vars
    deleteHotelById: (id: string) => Promise<void>;
    // eslint-disable-next-line no-unused-vars
    getAllHotelsToAdmin: () => Promise<void>;
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
        set({ hotels: [] });
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

    getHotelsByCityAndDate: async (cityId = null, checkIn = null, checkOut = null) => {
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

    getAllHotelsToAdmin: async () => {
        try {
            set({ hotels: [] });
            const { data } = await axios.get<IHotel[]>("/api/hotel/all");

            set({ hotels: data });
        } catch (error) {
            console.log(error);
        }
    },

    updateHotelById: async (id, body) => {
        try {
            const { data } = await axios.put<IHotel>(`/api/hotel/${id}`, body);

            set((state) => ({
                hotels: state.hotels.map((hotel) => {
                    if (hotel.id === data.id) {
                        return data;
                    }

                    return hotel;
                }),
            }));
        } catch (error) {
            console.log(error);
        }
    },

    deleteHotelById: async (id) => {
        try {
            const { data } = await axios.delete<IHotel>(`/api/hotel/${id}`);

            set((state) => ({
                hotels: state.hotels.filter((hotel) => hotel.id !== data.id),
            }));
        } catch (error) {
            console.log(error);
        }
    },
}));
