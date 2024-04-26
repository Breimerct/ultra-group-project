"use client";
import { useAuthStore } from "@/app/store/auth-store/auth.store";
import { useEffect, useState } from "react";
import Link from "next/link";
import useCurrentUser from "@/hooks/current-user/useCurrentUser";
import { Role } from "@/types";

const UserOptions = () => {
    const { logout } = useAuthStore();
    const { user } = useCurrentUser();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        logout();
        setIsOpen(false);
    };

    const onOpen = () => {
        setIsOpen(true);
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

    const routes = [
        {
            name: "Perfil",
            href: "/profile",
            role: Role.User,
        },
        {
            name: "Dashboard",
            href: "/dashboard",
            role: Role.Admin,
        },
        {
            name: "Reservas",
            href: "/booking",
            role: Role.User,
        },
    ];

    const filteredRoutes = routes.filter((route) => {
        return route.role === user?.role || route.role !== Role.Admin;
    });

    return (
        <div
            id="user-options"
            className="relative flex justify-center items-center gap-1 h-full"
        >
            <button
                className="hover:bg-emerald-700 hover:text-white px-5 py-2 rounded-md transition-all text-current mr-2 "
                onClick={onOpen}
            >
                {user?.name}
            </button>
            <picture className="flex justify-center items-center">
                <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="object-cover aspect-square rounded-full h-[3.5rem] w-[3.5rem] border-4 border-white bg-white shadow-xl"
                />
            </picture>

            <div
                className={`absolute z-20 top-10 right-0 mt-1 w-60 p-2 bg-white border border-gray-300 rounded min-h-[200px] overflow-y-auto max-w-md ${
                    isOpen ? "visible" : "invisible"
                }`}
            >
                <ul className="flex flex-col text-black gap-5 w-full ">
                    {filteredRoutes.map((route, index) => (
                        <li
                            key={index}
                            className="px-5 py-2 text-center shadow-md outline-1 outline rounded-md text-emerald-900 outline-emerald-900 cursor-pointer hover:bg-emerald-700  hover:text-white transition-all"
                        >
                            <Link href={route.href} className="block w-full text-current">
                                {route.name}
                            </Link>
                        </li>
                    ))}

                    <li className="px-5 py-2 text-center shadow-md outline-1 outline rounded-md text-emerald-900 outline-emerald-900 cursor-pointer hover:bg-emerald-700  hover:text-white transition-all">
                        <a className="block w-full text-current" onClick={handleLogout}>
                            Cerrar sesión
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserOptions;
