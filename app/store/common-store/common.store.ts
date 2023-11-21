import { ICity } from "@/app/api/data/cities";
import axios from "axios";
import { type } from "os";
import { toast } from "react-toastify";
import { create } from "zustand";

type State = {
    Cities: ICity[];
};

type Actions = {
    getAllCities: () => void;
};

const initialState: State = {
    Cities: [],
};

export const useCommonStore = create<State & Actions>((set, get) => ({
    ...initialState,

    getAllCities: async () => {
        try {
            const { data } = await axios.get("/api/data/cities");
            set({ Cities: data });
        } catch (error) {
            console.error("GET ALL CITIES ERROR: ", error);
        }
    },
}));
