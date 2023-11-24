import { IRoom } from "@/app/api/room/room.service";
import axios from "axios";
import { create } from "zustand";
import { useCommonStore } from "../common-store/common.store";

type State = {
    rooms: IRoom[];
    isLoadingRooms: boolean;
    room: IRoom | null;
};

type Actions = {
    getAllRooms: () => Promise<void>;
    // eslint-disable-next-line no-unused-vars
    getRoomById: (id: string) => Promise<void>;
    // eslint-disable-next-line no-unused-vars
    getRoomsByHotelAndDate: (hotelId: string | null, checkIn?: string, checkOut?: string) => Promise<void>;
    // eslint-disable-next-line no-unused-vars
    updateRoomById: (id: string, body: Partial<IRoom>) => Promise<void>;
    // eslint-disable-next-line no-unused-vars
    deleteRoomById: (id: string) => Promise<void>;
};

const initialState: State = {
    rooms: [],
    isLoadingRooms: false,
    room: null,
};

const { setIsLoading: setGlobalLoading } = useCommonStore.getState();

export const useRoomStore = create<State & Actions>((set) => ({
    ...initialState,
    getAllRooms: async () => {
        setGlobalLoading(true);
        set({ rooms: [], isLoadingRooms: true });
        try {
            const { data } = await axios<IRoom[]>("/api/room/all");

            set({ rooms: data });
        } catch (error) {
            console.log(error);
        } finally {
            setGlobalLoading(false);
            set({ isLoadingRooms: false });
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

    getRoomsByHotelAndDate: async (hotelId, checkIn, checkOut) => {
        set({ isLoadingRooms: true });
        set({ rooms: [] });
        try {
            const { data } = await axios.get<IRoom[]>("/api/room/hotel", {
                params: {
                    hotelId,
                    checkIn,
                    checkOut,
                },
            });

            set({ rooms: data });
        } catch (error) {
            console.log(error);
        } finally {
            set({ isLoadingRooms: false });
        }
    },

    updateRoomById: async (id, body) => {
        try {
            const { data } = await axios.put<IRoom>(`/api/room/${id}`, body);

            set((state) => {
                const roomIndex = state.rooms.findIndex((room) => room.id === id);

                state.rooms[roomIndex] = {
                    ...state.rooms[roomIndex],
                    ...data,
                };

                return { rooms: state.rooms };
            });
        } catch (error) {
            console.log(error);
        }
    },

    deleteRoomById: async (id) => {
        try {
            const { data } = await axios.delete<IRoom>(`/api/room/${id}`);

            set((state) => ({
                rooms: state.rooms.filter((room) => room.id !== data.id),
            }));
        } catch (error) {
            console.log(error);
        }
    },
}));
