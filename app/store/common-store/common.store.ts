import { ICategoryRoom, ICity } from "@/types";
import axios from "axios";
import { create } from "zustand";

type State = {
    cities: ICity[];
    categories: ICategoryRoom[];
    isLoading: boolean;
};

type Actions = {
    getAllCities: () => void;
    getAllCategories: () => void;
    setIsLoading: (isLoading: boolean) => void;
};

const initialState: State = {
    cities: [],
    categories: [],
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

    getAllCategories: async () => {
        try {
            const { data } = await axios.get("/api/data/categories");
            set({ categories: data });
        } catch (error) {
            console.error("GET ALL CATEGORIES ERROR: ", error);
        }
    },

    setIsLoading: (isLoading) => set({ isLoading }),
}));
