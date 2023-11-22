import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { ILogin, IUser } from "@/app/api/auth/auth.service";

type State = {
    user: IUser | null;
};

type Actions = {
    login: (payload: ILogin) => void;
    register: (payload: IUser) => void;
};

const initialState: State = {
    user: {
        id: "1",
        name: "Admin User",
        email: "tes@test.com",
        cellphone: "1234567890",
        avatar: `https://robohash.org/admin`,
        role: "admin",
        documentNumber: "1234567890",
    },
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
