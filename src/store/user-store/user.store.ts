import axios, { AxiosError } from "axios";
import { toast } from "sonner";
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
    getUser: (id: string) => Promise<IUser>;
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
                    const message = error.response?.data?.message || error.message;
                    toast.error(message);
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
                const message = error.response?.data?.message || error.message;
                toast.error(message);
            }
            return false;
        } finally {
            setGlobalIsLoading(false);
        }
    },

    async getUser(id) {
        setGlobalIsLoading(true);
        try {
            const { data } = await axios.get<IUser>(`/api/user/${id}`);

            get().setUser(data);
            return data;
        } catch (error: any) {
            if (error instanceof AxiosError) {
                const message = error.response?.data?.message || error.message;
                toast.error(message);
            }
            return {} as IUser;
        } finally {
            setGlobalIsLoading(false);
        }
    },

    setUser: (user) => {
        set({ user });

        const sessionData = user?._id ? { _id: user?._id } : null;
        sessionStorage.setItem("user", JSON.stringify(sessionData));
    },
}));
