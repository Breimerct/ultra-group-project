import { IRoom, IRoomDetail } from "@/app/api/room/room.service";
import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { useCommonStore } from "../common-store/common.store";
import { toast } from "react-toastify";

type State = {
    rooms: IRoomDetail[];
    isLoadingRooms: boolean;
    room: IRoom | null;
};

type Actions = {
    getAllRooms: () => Promise<void>;
    getRoomById: (id: string) => Promise<void>;
    getRoomsByHotelAndDate: (
        hotelId: string | null,
        checkIn?: string,
        checkOut?: string,
    ) => Promise<void>;
    updateRoomById: (id: string, body: Partial<IRoom>) => Promise<void>;
    deleteRoomById: (id: string) => Promise<void>;
    createRoom: (body: Partial<IRoom>) => Promise<void>;
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
            const { data } = await axios<IRoomDetail[]>("/api/room/all");

            set({ rooms: data });
        } catch (error: any) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || error.message);
            }
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
        } catch (error: any) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || error.message);
            }
        }
    },

    getRoomsByHotelAndDate: async (hotelId, checkIn, checkOut) => {
        set({ isLoadingRooms: true });
        set({ rooms: [] });
        try {
            const { data } = await axios.get<IRoomDetail[]>("/api/room/hotel", {
                params: {
                    hotelId,
                    checkIn,
                    checkOut,
                },
            });

            set({ rooms: data });
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || error.message);
            }
        } finally {
            set({ isLoadingRooms: false });
        }
    },

    updateRoomById: async (id, body) => {
        setGlobalLoading(true);
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

            toast.success("Habitación actualizada correctamente");
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || error.message);
            }
        } finally {
            setGlobalLoading(false);
        }
    },

    deleteRoomById: async (id) => {
        setGlobalLoading(true);
        try {
            const { data } = await axios.delete<IRoom>(`/api/room/${id}`);

            set((state) => ({
                rooms: state.rooms.filter((room) => room.id !== data.id),
            }));

            toast.success("Habitación eliminada correctamente");
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || error.message);
            }
        } finally {
            setGlobalLoading(false);
        }
    },

    createRoom: async (body) => {
        setGlobalLoading(true);
        try {
            const { data } = await axios.post<IRoomDetail>("/api/room", body);

            set((state) => ({
                rooms: [...state.rooms, data],
            }));

            toast.success("Habitación creada correctamente");
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || error.message);
            }
        } finally {
            setGlobalLoading(false);
        }
    },
}));
