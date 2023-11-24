"use client";
import { FC, FormEvent, useEffect, useState } from "react";
import { SearchIcon } from "../Icons";
import Autocomplete from "../autocomplete/Autocomplete";
import { useCommonStore } from "@/app/store/common-store/common.store";
import { ICity } from "@/app/api/data/cities";
import { toast } from "react-toastify";
import { IRangedDate, useHotelStore } from "@/app/store/hotel-store/hotel.store";
import { useRouter, usePathname } from "next/navigation";
import Input from "../input/Input";

const SearchDestinationForm: FC = () => {
    const { Cities, getAllCities } = useCommonStore();
    const { getHotelsByCityAndDate, setFilterSearch, filterSearch } = useHotelStore();
    const [city, setCity] = useState<ICity | null>(null);
    const [dareRange, setDateRange] = useState<IRangedDate>({
        checkIn: "",
        checkOut: "",
    });
    const [preValue, setPreValue] = useState<string>("");
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        getAllCities();
    }, []);

    useEffect(() => {
        if (pathName !== "/hotel") return () => {};
        if (!filterSearch?.checkIn && !filterSearch?.checkOut && !filterSearch?.cityId) return () => {};

        const city = Cities.find((city) => city.id === filterSearch.cityId);

        if (!city) return () => {};

        setCity(city);
        setPreValue(city?.name || "");
        setDateRange({ checkIn: filterSearch.checkIn, checkOut: filterSearch.checkOut });
    }, [pathName]);

    const handleSelectItem = (item: any) => {
        setCity(item as ICity);
        setFilterSearch({ ...filterSearch, cityId: item.id });
    };

    const handleInputDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateRange({ ...dareRange, [e.target.name]: e.target.value });
        setFilterSearch({ ...filterSearch, [e.target.name]: e.target.value });
    };

    const handleSubmitSearch = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if ((dareRange.checkIn || dareRange.checkOut) && !city) {
            toast("Por favor, seleccione una ciudad!", {
                type: "error",
            });
            return;
        }

        await getHotelsByCityAndDate(city?.id || null, dareRange.checkIn || null, dareRange.checkOut || null);

        setFilterSearch({ ...dareRange, cityId: city?.id || null });
        pathName !== "/hotel" && router.push("/hotel");
    };

    return (
        <form
            className="w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 items-center gap-3"
            onSubmit={handleSubmitSearch}
        >
            <div className="w-full col-span-5">
                <Autocomplete
                    label="Destino"
                    items={Cities}
                    filterBy="name"
                    preValue={preValue}
                    onSelectItem={handleSelectItem}
                />
            </div>

            <div className="w-full col-span-5 md:col-span-2 lg:col-span-2">
                <Input
                    label="Fecha de entrada"
                    name="checkIn"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={dareRange?.checkIn ?? ""}
                    onChange={handleInputDateChange}
                />
            </div>

            <div className="w-full col-span-5 md:col-span-2 lg:col-span-2">
                <Input
                    label="Fecha de salida"
                    name="checkOut"
                    type="date"
                    min={dareRange.checkIn ? dareRange.checkIn : new Date().toISOString().split("T")[0]}
                    value={dareRange?.checkOut ?? ""}
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
