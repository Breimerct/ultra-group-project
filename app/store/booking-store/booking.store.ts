import { IBooking, IEmergencyContact } from "@/app/api/bookings/bookings.service";
import { create } from "zustand";

interface IBookingDto extends Partial<IBooking> {}

type State = {
    bookingDto: IBookingDto;
};

type Actions = {
    setBookingDto: (bookingDto: IBookingDto) => void;
};

const initialState: State = {
    bookingDto: {
        id: "",
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
}));
