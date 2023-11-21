import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { create } from "zustand";

export interface IUser {
    id?: string;
    name: string;
    email: string;
    avatar: string;
    password?: string;
}

export interface ILogin {
    email: string;
    password: string;
}

type State = {
    user: IUser | null;
};

type Actions = {
    login: (payload: ILogin) => void;
};

export const useAuthStore = create<State & Actions>((set, get) => ({
    user: {
        name: "test user",
        email: "test@test.com",
        avatar: "https://i.pravatar.cc/300",
    },
    token: null,
    login: async ({ email, password }) => {
        try {
            const { data } = await axios.post("/api/auth/login", {
                email,
                password,
            });

            console.log("LOGIN LOG: ", data);

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
}));
