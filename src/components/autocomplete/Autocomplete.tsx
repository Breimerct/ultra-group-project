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
    const [results, setResults] = useState<Record<string, string>[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Record<string, string> | null>(null);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;

        if (term === "") {
            setResults(items);
            setSearchTerm(term);
            setSelectedItem(null);
            return;
        }

        setSearchTerm(term);
        setResults(() => {
            return items.filter((item) => item[filterBy].toLowerCase().includes(searchTerm.toLowerCase()));
        });
        onChangeInput && onChangeInput(term);
    };

    useEffect(() => {
        if (preValue) {
            setSearchTerm(preValue);
        }

        return () => {};
    }, [preValue]);

    const handleSelectItem = (item: Record<string, string>) => {
        setSearchTerm(item[filterBy]);
        setResults(items);
        setSelectedItem(item);
        setShowResults(false);
        onSelectItem && onSelectItem(item);
    };

    const handleFocus = () => {
        setShowResults(true);
        setResults(items.filter((item) => item[filterBy].toLowerCase().includes(searchTerm.toLowerCase())));
    };

    const clearSearch = () => {
        setSearchTerm("");
        setSelectedItem(null);
        onClearInput && onClearInput();
    };

    const handleClickOutside = (event: MouseEvent) => {
        const autocomplete = document.getElementById("autocomplete");

        if (autocomplete && !autocomplete.contains(event.target as Node)) {
            setShowResults(false);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();

            if (
                results.length > 0 &&
                searchTerm &&
                results[0][filterBy].toLowerCase().includes(searchTerm.toString())
            ) {
                handleSelectItem(results[0]);
                setShowResults(false);
            }
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        if (!selectedItem) {
            setSearchTerm("");
        }

        if (inputValue === "") {
            setSelectedItem(null);
        }

        if (selectedItem && inputValue && inputValue !== selectedItem[filterBy]) {
            setSearchTerm(selectedItem[filterBy]);
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
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    {...props}
                />
            </div>
            {showResults && (
                <ul
                    id="result-list"
                    className="absolute z-20 top-16 mt-1 w-full bg-white border border-gray-300 rounded max-h-[200px] overflow-y-auto"
                >
                    {results.map((result, index) => (
                        <li
                            key={index}
                            className={`p-2 cursor-pointer hover:bg-gray-300 focus:bg-emerald-200 select-none ${
                                selectedItem && selectedItem[filterBy] === result[filterBy]
                                    ? "bg-emerald-800 hover:!bg-emerald-800 text-white"
                                    : ""
                            }`}
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
