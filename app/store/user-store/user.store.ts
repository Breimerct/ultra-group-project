import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { useCommonStore } from "../common-store/common.store";
import { IUser } from "@/types";

type State = {
    user: IUser | null;
};

type Actions = {
    setUser: (user: IUser | null) => void;
    updateUser: (id: string, user: Partial<IUser>) => Promise<void>;
    updateUserPassword: (
        id: string,
        currentPassword: string,
        newPassword: string,
    ) => Promise<void>;
};

type Store = State & Actions;

const initialState: State = {
    user: null,
};

const { setIsLoading: setGlobalIsLoading } = useCommonStore.getState();

export const useUserStore = create<Store>((set) => ({
    ...initialState,

    updateUser: async (id, user) => {
        setGlobalIsLoading(true);
        try {
            const { data } = await axios.put<IUser>(`/api/user/${id}`, user);

            toast.success("usuario actualizado");
            set({ user: data });
        } catch (error: any) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || error.message);
            }
        } finally {
            setGlobalIsLoading(false);
        }
    },

    updateUserPassword: async (id, currentPassword, newPassword) => {
        setGlobalIsLoading(true);
        try {
            const { data } = await axios.patch<IUser>(`/api/user/${id}`, {
                currentPassword,
                newPassword,
            });

            toast.success("contraseña actualizada");
            set({ user: data });
        } catch (error: any) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || error.message);
            }
        } finally {
            setGlobalIsLoading(false);
        }
    },

    setUser: (user) => {
        set({ user });
        localStorage.setItem("user", JSON.stringify(user));
    },
}));
