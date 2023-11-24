import { IBooking, IBookingDetail, IEmergencyContact } from "@/app/api/booking/bookings.service";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { useHotelStore } from "../hotel-store/hotel.store";
import { useCommonStore } from "../common-store/common.store";

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
    findBookingDetail: (bookingId: string | null | undefined) => void;
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

    setBookingDto: (bookingDto: IBookingDto) => set((state) => ({ ...state.bookingDto, bookingDto })),

    createBooking: async (booking) => {
        const { setIsLoading } = useCommonStore.getState();
        setIsLoading(true);
        try {
            await axios.post("/api/booking", booking);

            toast("Reserva creada correctamente", {
                type: "success",
            });

            set({ bookingDto: {} });
        } catch (error: any) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || error.message);
            }
            console.log("CREATE BOOKING ERROR: ", error);
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
                toast.error(error.response?.data?.message || error.message);
            }
            console.log("FIND BOOKINGS ERROR: ", error);
        } finally {
            setGlobalLoading(false);
        }
    },

    findBookingDetail: async (bookingId) => {
        try {
            const { data } = await axios.get(`/api/booking/detail/${bookingId}`);

            set({ booking: data });
        } catch (error: any) {
            set({ booking: null });
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || error.message);
            }
            console.log("FIND BOOKING DETAIL ERROR: ", error);
        }
    },
}));
