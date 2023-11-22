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
    const { getHotelsByCityAndDate } = useHotelStore();
    const [city, setCity] = useState<ICity | null>(null);
    const [checkDate, setCheckDate] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        getAllCities();
    }, []);

    const handleSelectItem = (item: any) => {
        setCity(item as ICity);
    };

    const handleInputDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setCheckDate(e.target.value);
    };

    const handleSubmitSearch = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (checkDate && !city) {
            toast("Por favor, seleccione una ciudad!", {
                type: "error",
            });
            return;
        }

        await getHotelsByCityAndDate(city?.id || null, checkDate || "");

        router.push("/hotel");
    };

    return (
        <form
            className="w-full flex items-center gap-3"
            onSubmit={handleSubmitSearch}
        >
            <div className="w-full">
                <Autocomplete
                    label="Destino"
                    items={Cities}
                    filterBy="name"
                    onSelectItem={handleSelectItem}
                />
            </div>
            <div className="w-full">
                <Input
                    label="Fecha"
                    type="date"
                    placeholder="Fecha"
                    onChange={handleInputDateChange}
                />
            </div>
            <div className="col-auto self-end">
                <button
                    type="submit"
                    className="rounded-md px-5 py-2 bg-emerald-700 flex flex-nowrap items-center gap-3 font-medium text-white hover:bg-emerald-800 hover:shadow-sm hover:shadow-emerald-950/70 transition-all"
                >
                    <span>Buscar</span>
                    <SearchIcon />
                </button>
            </div>
        </form>
    );
};

export default SearchDestinationForm;
