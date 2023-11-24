import { ICity } from "@/app/api/data/cities";
import axios from "axios";
import { create } from "zustand";

type State = {
    cities: ICity[];
    isLoading: boolean;
};

type Actions = {
    getAllCities: () => void;
    setIsLoading: (isLoading: boolean) => void;
};

const initialState: State = {
    cities: [],
    isLoading: false,
};

export const useCommonStore = create<State & Actions>((set, get) => ({
    ...initialState,

    getAllCities: async () => {
        try {
            const { data } = await axios.get("/api/data/cities");
            set({ cities: data });
        } catch (error) {
            console.error("GET ALL CITIES ERROR: ", error);
        }
    },

    setIsLoading: (isLoading) => set({ isLoading }),
}));
