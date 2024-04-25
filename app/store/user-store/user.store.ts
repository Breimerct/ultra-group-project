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
    updateUser: (id: string, user: Partial<IUser>) => Promise<boolean>;
    updateUserPassword: (
        id: string,
        currentPassword: string,
        newPassword: string,
    ) => Promise<boolean>;
};

type Store = State & Actions;

const initialState: State = {
    user: null,
};

const { setIsLoading: setGlobalIsLoading } = useCommonStore.getState();

export const useUserStore = create<Store>((set, get) => ({
    ...initialState,

    async updateUser(id, user) {
        return new Promise(async (resolve, reject) => {
            setGlobalIsLoading(true);
            try {
                const { data } = await axios.put<IUser>(`/api/user/${id}`, user);

                console.log("data", data);
                toast.success("usuario actualizado");
                get().setUser(data);
                resolve(true);
            } catch (error: any) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data?.message || error.message);
                }
                reject(false);
            } finally {
                setGlobalIsLoading(false);
            }
        });
    },

    async updateUserPassword(id, currentPassword, newPassword) {
        setGlobalIsLoading(true);
        try {
            const { data } = await axios.patch<IUser>(`/api/user/${id}`, {
                currentPassword,
                newPassword,
            });

            toast.success("contraseña actualizada");
            get().setUser(data);
            return true;
        } catch (error: any) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || error.message);
            }
            return false;
        } finally {
            setGlobalIsLoading(false);
        }
    },

    setUser: (user) => {
        set({ user });
        sessionStorage.setItem("user", JSON.stringify(user));
    },
}));
