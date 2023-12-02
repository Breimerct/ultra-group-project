/* eslint-disable no-unused-vars */
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { ILogin } from "@/app/api/auth/auth.service";
import { IUser } from "@/app/api/user/user.service";
import { useCommonStore } from "../common-store/common.store";
import { useUserStore } from "../user-store/user.store";

type State = {};

type Actions = {
    login: (payload: ILogin) => Promise<boolean>;
    register: (payload: IUser) => Promise<boolean>;
    logout: () => void;
};

const initialState: State = {};

const { setIsLoading: setGlobalLoading } = useCommonStore.getState();
const { setUser } = useUserStore.getState();

export const useAuthStore = create<State & Actions>((set) => ({
    ...initialState,
    login: async ({ email, password }) => {
        setGlobalLoading(true);
        try {
            const { data } = await axios.post<IUser>("/api/auth/login", {
                email,
                password,
            });

            console.log(data);

            setUser(data);
            return true;
        } catch (error) {
            if (error instanceof AxiosError) {
                toast(error.response?.data?.message || error.message, {
                    type: "error",
                });
            }
            return false;
        } finally {
            setGlobalLoading(false);
        }
    },

    logout: () => {
        setUser(null);
    },

    register: async (payload) => {
        setGlobalLoading(true);
        try {
            const { data } = await axios.post("/api/auth/register", payload);

            toast("Usuario registrado correctamente", {
                type: "success",
            });

            setUser(data);
            return true;
        } catch (error) {
            if (error instanceof AxiosError) {
                toast(error.response?.data?.message || error.message, {
                    type: "error",
                });
            }
            return false;
        } finally {
            setGlobalLoading(false);
        }
    },
}));
