"use client";
import { useAuthStore } from "@/app/store/auth-store/auth.store";
import { useEffect, useState } from "react";
import ProtectByRol from "../protect-by-rol/ProtectByRol";

const UserOptions = () => {
    const { user, logout } = useAuthStore();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        logout();
        setIsOpen(false);
    };

    const onOpen = () => {
        setIsOpen(true);
    };

    const onClose = () => {
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        const autocomplete = document.getElementById("user-options");

        if (autocomplete && !autocomplete.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div
            id="user-options"
            className="relative flex justify-center items-center gap-1 h-full"
        >
            <picture className="flex justify-center items-center">
                <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="object-cover aspect-square rounded-full h-9 w-9 border-4 border-white bg-white shadow-xl"
                />
            </picture>
            <button
                className="hover:text-emerald-500 transition-all text-current"
                onClick={onOpen}
            >
                {user?.name}
            </button>

            <div
                className={`absolute z-20 top-10 right-0 mt-1 w-60 p-2 bg-white border border-gray-300 rounded max-h-[200px] overflow-y-auto max-w-md ${
                    isOpen ? "visible" : "invisible"
                }`}
            >
                <ul className="flex flex-col text-black gap-5 w-full ">
                    <ProtectByRol isUser>
                        <li className="px-5 py-2 text-center shadow-md outline-1 outline rounded-md text-emerald-900 outline-emerald-900 cursor-pointer hover:bg-emerald-700  hover:text-white transition-all">
                            <a className="block w-full text-current">
                                Reservas
                            </a>
                        </li>
                    </ProtectByRol>

                    <li className="px-5 py-2 text-center shadow-md outline-1 outline rounded-md text-emerald-900 outline-emerald-900 cursor-pointer hover:bg-emerald-700  hover:text-white transition-all">
                        <a
                            className="block w-full text-current"
                            onClick={handleLogout}
                        >
                            Cerrar sesión
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserOptions;
