"use client";
import React, { use, useEffect, useState } from "react";
import { CloseIcon } from "../Icons";

interface AutocompleteProps {
    items: any[];
    filterBy: string;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ items, filterBy }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
    };

    useEffect(() => {
        let filteredResults = items.filter((item) =>
            item[filterBy].toLowerCase().includes(searchTerm.toLowerCase()),
        );

        if (filteredResults.length < 1) {
            filteredResults = items.slice(0, 10);
        }

        setResults(filteredResults);

        return () => {};
    }, [searchTerm, items]);

    const handleSelectItem = (item: any) => {
        setSearchTerm(item[filterBy]);
        setResults(items.slice(0, 10));
        setShowResults(false);
    };

    const handleFocus = () => {
        setShowResults(true);
    };

    const clearSearch = () => {
        setSearchTerm("");
        setResults([]);
    };

    const handleClickOutside = (event: MouseEvent) => {
        const autocomplete = document.getElementById("autocomplete");

        if (autocomplete && !autocomplete.contains(event.target as Node)) {
            setShowResults(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div id="autocomplete" className="relative">
            <input
                type="text"
                className="outline-none rounded-md border-2 border-solid border-zinc-400 p-2 w-full"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                onFocus={handleFocus}
            />
            {showResults && (
                <ul className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded max-h-[200px] overflow-y-auto">
                    {results.map((result, index) => (
                        <li
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-100 select-none"
                            onClick={() => handleSelectItem(result)}
                        >
                            {result[filterBy] ?? "-"}
                        </li>
                    ))}

                    {results.length === 0 && (
                        <div className="p-2 select-none">No hay resultados</div>
                    )}
                </ul>
            )}

            {searchTerm && (
                <button
                    className="absolute top-0 right-0 p-2 text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={clearSearch}
                >
                    <CloseIcon />
                </button>
            )}
        </div>
    );
};

export default Autocomplete;
