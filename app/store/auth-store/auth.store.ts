/* eslint-disable no-unused-vars */
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { ILogin } from "@/app/api/auth/auth.service";
import { IUser } from "@/app/api/user/user.service";

type State = {
    user: IUser | null;
};

type Actions = {
    login: (payload: ILogin) => void;
    register: (payload: IUser) => void;
    logout: () => void;
};

const initialState: State = {
    user: null,
};

export const useAuthStore = create<State & Actions>((set) => ({
    ...initialState,
    login: async ({ email, password }) => {
        try {
            const { data } = await axios.post("/api/auth/login", {
                email,
                password,
            });

            set({ user: data.user });
        } catch (error) {
            if (error instanceof AxiosError) {
                toast(error.response?.data?.message || error.message, {
                    type: "error",
                });
            }
            console.log("LOGIN ERROR: ", error);
        }
    },

    logout: () => {
        set({ user: null });
    },

    register: async (payload) => {
        try {
            const { data } = await axios.post("/api/auth/register", payload);

            toast("Usuario registrado correctamente", {
                type: "success",
            });

            set({ user: data });
        } catch (error) {
            if (error instanceof AxiosError) {
                toast(error.response?.data?.message || error.message, {
                    type: "error",
                });
            }
            console.log("REGISTER ERROR: ", error);
        }
    },
}));
