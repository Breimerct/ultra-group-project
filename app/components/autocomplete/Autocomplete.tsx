"use client";
import React, { useEffect, useState } from "react";
import { CloseIcon } from "../Icons";
import Input from "../input/Input";

interface AutocompleteProps extends React.HTMLAttributes<any> {
    items: any[];
    filterBy: string;
    onSelectItem?: (item: any) => void;
    onClearInput?: () => void;
    onChangeInput?: (value: string) => void;
    placeholder?: string;
    label: string;
    preValue?: string;
    isInvalid?: boolean;
    messageError?: string;
    readOnly?: boolean;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
    items,
    filterBy,
    onSelectItem,
    onClearInput,
    onChangeInput,
    placeholder,
    label,
    preValue = "",
    isInvalid,
    messageError = "",
    readOnly,
    ...props
}) => {
    const [searchTerm, setSearchTerm] = useState(preValue);
    const [results, setResults] = useState<any[]>([]);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        onChangeInput && onChangeInput(term);
        setSearchTerm(term);
    };

    useEffect(() => {
        let filteredResults = items.filter((item) => item[filterBy].toLowerCase().includes(searchTerm.toLowerCase()));

        if (filteredResults.length < 1) {
            filteredResults = items.slice(0, 10);
        }

        setResults(filteredResults);

        return () => {};
    }, [searchTerm, items]);

    useEffect(() => {
        if (preValue) {
            setSearchTerm(preValue);
        }

        return () => {};
    }, [preValue]);

    const handleSelectItem = (item: any) => {
        setSearchTerm(item[filterBy]);
        setResults(items.slice(0, 10));
        setShowResults(false);
        onSelectItem && onSelectItem(item);
    };

    const handleFocus = () => {
        setShowResults(true);
    };

    const clearSearch = () => {
        setSearchTerm("");
        setResults([]);
        onClearInput && onClearInput();
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
            <div>
                <Input
                    readOnly={readOnly}
                    label={label}
                    type="text"
                    placeholder={placeholder}
                    value={searchTerm}
                    isInvalid={isInvalid}
                    messageError={messageError}
                    onChange={handleSearch}
                    onFocus={handleFocus}
                    {...props}
                />
            </div>
            {showResults && (
                <ul className="absolute z-20 top-16 mt-1 w-full bg-white border border-gray-300 rounded max-h-[200px] overflow-y-auto">
                    {results.map((result, index) => (
                        <li
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-100 select-none"
                            onClick={() => handleSelectItem(result)}
                        >
                            {result[filterBy] ?? "-"}
                        </li>
                    ))}

                    {results.length === 0 && <div className="p-2 select-none">No hay resultados</div>}
                </ul>
            )}

            {searchTerm && !readOnly && (
                <button
                    className="absolute top-[50%] translate-y-[-20%] right-0 p-2 text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={clearSearch}
                >
                    <CloseIcon />
                </button>
            )}
        </div>
    );
};

export default Autocomplete;
