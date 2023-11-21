"use client";
import { FC, useEffect } from "react";
import { SearchIcon } from "../Icons";
import Autocomplete from "../autocomplete/Autocomplete";
import { useCommonStore } from "@/app/store/common-store/common.store";

const SearchDestinationForm: FC = () => {
    const { Cities, getAllCities } = useCommonStore();

    useEffect(() => {
        getAllCities();
    }, []);

    return (
        <form className="w-full flex items-center gap-3">
            <div className="w-full">
                <label className="text-sm font-medium text-emerald-900">
                    Destino
                </label>
                <Autocomplete items={Cities} filterBy="name" />
            </div>
            <div className="w-full">
                <label>date</label>
                <input
                    type="date"
                    className="outline-none rounded-md border-2 border-solid border-zinc-400 p-2 w-full"
                />
            </div>
            <div className="col-auto self-end">
                <button className="rounded-md px-5 py-2 bg-emerald-700 flex flex-nowrap items-center gap-3 font-medium text-white hover:bg-emerald-800 hover:shadow-sm hover:shadow-emerald-950/70 transition-all">
                    <span>Buscar</span>
                    <SearchIcon />
                </button>
            </div>
        </form>
    );
};

export default SearchDestinationForm;
