import { IRoom } from "@/app/api/room/room.service";
import axios from "axios";
import { create } from "zustand";

type State = {
    rooms: IRoom[];
    isLoadingRooms: boolean;
    room: IRoom | null;
};

type Actions = {
    getAllRooms: () => Promise<void>;
    getRoomById: (id: string) => Promise<void>;
    getRoomsByHotelAndDate: (
        hotelId: number | null,
        checkDate: string,
    ) => Promise<void>;
};

const initialState: State = {
    rooms: [],
    isLoadingRooms: false,
    room: null,
};

export const useRoomStore = create<State & Actions>((set) => ({
    ...initialState,
    getAllRooms: async () => {
        try {
            const { data } = await axios<IRoom[]>("/api/room");

            set({ rooms: data });
        } catch (error) {
            console.log(error);
        }
    },
    getRoomById: async (id) => {
        try {
            const response = await fetch(`/api/room/${id}`);
            const room = await response.json();

            set({ room });
        } catch (error) {
            console.log(error);
        }
    },

    getRoomsByHotelAndDate: async (
        hotelId: number | null,
        checkDate: string,
    ) => {
        set({ isLoadingRooms: true });
        set({ rooms: [] });
        try {
            const { data } = await axios.get<IRoom[]>("api/room/hotel", {
                params: {
                    hotelId,
                    checkDate,
                },
            });

            set({ rooms: data });
        } catch (error) {
            console.log(error);
        } finally {
            set({ isLoadingRooms: false });
        }
    },
}));
