/* eslint-disable no-unused-vars */
import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ILogin } from "@services/auth.service";
import { IUser } from "@services/user.service";
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
