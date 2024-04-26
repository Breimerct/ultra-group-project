import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { useCommonStore } from "../common-store/common.store";
import { IBooking, IBookingDetail } from "@/types";

export interface IBookingDto extends Partial<IBooking> {}

type State = {
    bookingDto: IBookingDto;
    bookings: IBooking[];
    booking: IBookingDetail | null;
    isLoading: boolean;
};

type Actions = {
    setBookingDto: (bookingDto: IBookingDto) => void;
    createBooking: (booking: IBookingDto) => Promise<void>;
    findBookings: (userId?: string | null) => void;
    findBookingDetail: (bookingId: string | null | undefined) => Promise<void>;
};

const initialState: State = {
    bookingDto: {
        checkIn: "",
        checkOut: "",
        roomId: "",
        userId: "",
        companions: [],
        emergencyContact: {
            name: "",
            cellphone: "",
        },
    },
    bookings: [],
    booking: null,
    isLoading: false,
};

const { setIsLoading: setGlobalLoading } = useCommonStore.getState();

export const useBookingStore = create<State & Actions>((set) => ({
    ...initialState,

    setBookingDto: (bookingDto: IBookingDto) =>
        set((state) => ({ ...state.bookingDto, bookingDto })),

    createBooking: async (booking) => {
        const { setIsLoading } = useCommonStore.getState();
        setIsLoading(true);
        try {
            await axios.post("/api/booking", booking);

            toast.success("Reserva creada correctamente");

            set({ bookingDto: {} });
        } catch (error: any) {
            if (error instanceof AxiosError) {
                const message = error.response?.data?.message || error.message;
                toast.error(message);
            }
        } finally {
            setIsLoading(false);
        }
    },

    findBookings: async (userId = null) => {
        setGlobalLoading(true);
        try {
            const { data } = await axios.get(`/api/booking`, {
                params: {
                    userId,
                },
            });

            set({ bookings: data });
        } catch (error: any) {
            set({ bookings: [] });
            if (error instanceof AxiosError) {
                const message = error.response?.data?.message || error.message;
                toast.error(message);
            }
        } finally {
            setGlobalLoading(false);
        }
    },

    findBookingDetail: async (bookingId) => {
        setGlobalLoading(true);
        try {
            const { data } = await axios.get(`/api/booking/detail/${bookingId}`);

            set({ booking: data });
        } catch (error: any) {
            set({ booking: null });
            if (error instanceof AxiosError) {
                const message = error.response?.data?.message || error.message;
                toast.error(message);
            }
        } finally {
            setGlobalLoading(false);
        }
    },
}));
