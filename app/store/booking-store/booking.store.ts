import { IBooking, IEmergencyContact } from "@/app/api/bookings/bookings.service";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";

interface IBookingDto extends Partial<IBooking> {}

type State = {
    bookingDto: IBookingDto;
};

type Actions = {
    setBookingDto: (bookingDto: IBookingDto) => void;
    createBooking: (booking: IBookingDto) => void;
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
};

export const useBookingStore = create<State & Actions>((set) => ({
    ...initialState,

    setBookingDto: (bookingDto: IBookingDto) => set((state) => ({ ...state.bookingDto, bookingDto })),

    createBooking: async (booking: IBookingDto) => {
        try {
            const { data } = await axios.post("/api/bookings", booking);

            toast("Reserva creada correctamente", {
                type: "success",
            });

            set({ bookingDto: {} });
        } catch (error: any) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || error.message);
            }
            console.log("CREATE BOOKING ERROR: ", error);
        }
    },
}));
