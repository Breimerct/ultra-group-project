/* eslint-disable no-unused-vars */
import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useCommonStore } from "../common-store/common.store";
import { useUserStore } from "../user-store/user.store";
import { ILogin, IUser } from "@/types";

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
        } catch (error: Error | any) {
            if (error instanceof AxiosError) {
                const message = error.response?.data?.message || error.message;
                toast.error(message);
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

            toast.success("Usuario registrado correctamente.");

            setUser(data);
            return true;
        } catch (error: Error | any) {
            if (error instanceof AxiosError) {
                const message = error.response?.data?.message || error.message;
                toast.error(message);
            }
            return false;
        } finally {
            setGlobalLoading(false);
        }
    },
}));
