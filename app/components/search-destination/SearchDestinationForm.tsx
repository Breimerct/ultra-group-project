"use client";
import { FC, FormEvent, useEffect, useState } from "react";
import { SearchIcon } from "../Icons";
import Autocomplete from "../autocomplete/Autocomplete";
import { useCommonStore } from "@/app/store/common-store/common.store";
import { ICity } from "@/app/api/data/cities";
import { toast } from "react-toastify";
import { useHotelStore } from "@/app/store/hotel-store/hotel.store";
import { useRouter } from "next/navigation";
import Input from "../input/Input";

const SearchDestinationForm: FC = () => {
    const { Cities, getAllCities } = useCommonStore();
    const { getHotelsByCityAndDate, setFilterSearch } = useHotelStore();
    const [city, setCity] = useState<ICity | null>(null);
    const [dareRange, setDateRange] = useState<{ checkIn: string; checkOut: string }>({ checkIn: "", checkOut: "" });
    const router = useRouter();

    useEffect(() => {
        getAllCities();
    }, []);

    const handleSelectItem = (item: any) => {
        setCity(item as ICity);
        setFilterSearch({ ...dareRange, cityId: item.id });
    };

    const handleInputDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateRange({ ...dareRange, [e.target.name]: e.target.value });
        setFilterSearch({ ...dareRange, [e.target.name]: e.target.value });
    };

    const handleSubmitSearch = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if ((dareRange.checkIn || dareRange.checkOut) && !city) {
            toast("Por favor, seleccione una ciudad!", {
                type: "error",
            });
            return;
        }

        await getHotelsByCityAndDate(city?.id || null, dareRange.checkIn, dareRange.checkOut);

        router.push("/hotel");
    };

    return (
        <form
            className="w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 items-center gap-3"
            onSubmit={handleSubmitSearch}
        >
            <div className="w-full col-span-5">
                <Autocomplete label="Destino" items={Cities} filterBy="name" onSelectItem={handleSelectItem} />
            </div>

            <div className="w-full col-span-5 md:col-span-2 lg:col-span-2">
                <Input
                    label="Fecha de entrada"
                    name="checkIn"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    placeholder="Fecha"
                    onChange={handleInputDateChange}
                />
            </div>

            <div className="w-full col-span-5 md:col-span-2 lg:col-span-2">
                <Input
                    label="Fecha de salida"
                    name="checkOut"
                    type="date"
                    placeholder="Fecha"
                    min={dareRange.checkIn ? dareRange.checkIn : new Date().toISOString().split("T")[0]}
                    onChange={handleInputDateChange}
                />
            </div>

            <div className="col-span-5 md:col-span-4 lg:col-span-1 self-end">
                <button
                    type="submit"
                    className="rounded-md w-full grid place-content-center px-5 py-2 bg-emerald-700 flex-nowrap items-center gap-3 font-medium text-white hover:bg-emerald-800 hover:shadow-sm hover:shadow-emerald-950/70 transition-all"
                >
                    <div className="w-full flex flex-nowrap justify-center gap-2">
                        <span>Buscar</span>
                        <SearchIcon />
                    </div>
                </button>
            </div>
        </form>
    );
};

export default SearchDestinationForm;
