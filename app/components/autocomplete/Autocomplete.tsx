"use client";
import React, { useState } from "react";

interface AutocompleteProps {
    items: string[];
}

const Autocomplete: React.FC<AutocompleteProps> = ({ items }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<string[]>([]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);

        // Lógica de búsqueda
        const filteredResults = items.filter((item) =>
            item.toLowerCase().includes(term.toLowerCase()),
        );

        setResults(filteredResults);
    };

    const clearSearch = () => {
        setSearchTerm("");
        setResults([]);
    };

    return (
        <div className="relative w-64">
            <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
            />
            {results.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded">
                    {results.map((result, index) => (
                        <div
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => alert(`Selected: ${result}`)}
                        >
                            {result}
                        </div>
                    ))}
                </div>
            )}
            {searchTerm && (
                <button
                    className="absolute top-0 right-0 p-2 text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={clearSearch}
                >
                    &#10005;
                </button>
            )}
        </div>
    );
};

export default Autocomplete;
