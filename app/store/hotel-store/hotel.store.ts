import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { useCommonStore } from "../common-store/common.store";
import { IHotel } from "@/types";
export interface IRangedDate {
    checkIn?: string | null;
    checkOut?: string | null;
}

export interface IFilterSearch extends IRangedDate {
    cityId?: number | null;
}

type State = {
    hotels: IHotel[];
    isLoadingHotels: boolean;
    hotel: IHotel | null;
    filterSearch: IFilterSearch;
};

type Actions = {
    createHotel: (body: Partial<IHotel>) => Promise<void>;
    getAllHotels: () => Promise<void>;
    getHotelById: (id: string) => Promise<void>;
    getHotelsByCityAndDate: (
        cityId: number | null,
        checkIn: string | null,
        checkOut: string | null,
    ) => Promise<void>;
    setFilterSearch: (filterSearch: IFilterSearch) => void;
    updateHotelById: (id: string, body: Partial<IHotel>) => Promise<void>;
    deleteHotelById: (id: string) => Promise<void>;
    getAllHotelsToAdmin: () => Promise<void>;
};

const initialState: State = {
    hotels: [],
    isLoadingHotels: false,
    hotel: null,
    filterSearch: {
        cityId: null,
        checkIn: "",
        checkOut: "",
    },
};

const { setIsLoading: setGlobalLoading } = useCommonStore.getState();

export const useHotelStore = create<State & Actions>((set, get) => ({
    ...initialState,

    createHotel: async (body) => {
        setGlobalLoading(true);
        try {
            const { data } = await axios.post<IHotel>("/api/hotel", body);

            set((state) => ({
                hotels: [...state.hotels, data],
            }));

            toast.success("Hotel creado correctamente");
        } catch (error: any) {
            if (error instanceof AxiosError) {
                const message = error.response?.data?.message || error.message;
                toast.error(message);
            }
        } finally {
            setGlobalLoading(false);
        }
    },

    getAllHotels: async () => {
        set({ hotels: [], isLoadingHotels: true });
        try {
            const { data } = await axios<IHotel[]>("/api/hotel");

            set({ hotels: data });
        } catch (error: Error | any) {
            if (error instanceof AxiosError) {
                const message = error.response?.data?.message || error.message;
                toast.error(message);
            }
        } finally {
            set({ isLoadingHotels: false });
        }
    },

    getHotelById: async (id) => {
        setGlobalLoading(true);
        try {
            set({ hotel: null });
            const response = await fetch(`/api/hotel/${id}`);
            const hotel = await response.json();

            set({ hotel });
        } catch (error: Error | any) {
            if (error instanceof AxiosError) {
                const message = error.response?.data?.message || error.message;
                toast.error(message);
            }
        } finally {
            setGlobalLoading(false);
        }
    },

    getHotelsByCityAndDate: async (cityId = null, checkIn = null, checkOut = null) => {
        setGlobalLoading(true);
        set({ hotels: [] });
        try {
            const { data } = await axios.get<IHotel[]>("/api/hotel", {
                params: {
                    cityId,
                    checkIn,
                    checkOut,
                },
            });

            set({ hotels: data });
        } catch (error: Error | any) {
            if (error instanceof AxiosError) {
                const message = error.response?.data?.message || error.message;
                toast.error(message);
            }
        } finally {
            setGlobalLoading(false);
        }
    },

    setFilterSearch: (filterSearch) => {
        set({ filterSearch });
    },

    getAllHotelsToAdmin: async () => {
        setGlobalLoading(true);
        set({ hotels: [], isLoadingHotels: true });
        try {
            const { data } = await axios.get<IHotel[]>("/api/hotel/all");

            set({ hotels: data });
        } catch (error: Error | any) {
            if (error instanceof AxiosError) {
                const message = error.response?.data?.message || error.message;
                toast.error(message);
            }
        } finally {
            setGlobalLoading(false);
            set({ isLoadingHotels: false });
        }
    },

    updateHotelById: async (id, body) => {
        setGlobalLoading(true);
        try {
            const { data } = await axios.put<IHotel>(`/api/hotel/${id}`, body);

            set((state) => ({
                hotels: state.hotels.map((hotel) => (hotel._id === data._id ? data : hotel)),
            }));

            toast.success("Hotel actualizado correctamente");
        } catch (error: Error | any) {
            if (error instanceof AxiosError) {
                const message = error.response?.data?.message || error.message;
                toast.error(message);
            }
        } finally {
            setGlobalLoading(false);
        }
    },

    deleteHotelById: async (id) => {
        try {
            const { data } = await axios.delete<IHotel>(`/api/hotel/${id}`);

            set((state) => ({
                hotels: state.hotels.filter((hotel) => hotel._id !== data._id),
            }));

            toast.success("Hotel eliminado correctamente");
        } catch (error: Error | any) {
            if (error instanceof AxiosError) {
                const message = error.response?.data?.message || error.message;
                toast.error(message);
            }
        }
    },
}));
