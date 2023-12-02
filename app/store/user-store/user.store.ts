import { IUser } from "@/app/api/user/user.service";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";

type State = {
    user: IUser | null;
};

type Actions = {
    setUser: (user: IUser | null) => void;
    updateUser: (id: string, user: Partial<IUser>) => Promise<void>;
};

type Store = State & Actions;

const initialState: State = {
    user: null,
};

export const useUserStore = create<Store>((set) => ({
    ...initialState,

    updateUser: async (id, user) => {
        try {
            const { data } = await axios.put<IUser>(`/api/user/${id}`, user);

            set({ user: data });
        } catch (error: any) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || error.message);
            }
        }
    },

    setUser: (user) => {
        set({ user });
    },
}));
