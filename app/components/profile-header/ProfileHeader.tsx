"use client";
import Header from "../header/Header";
import { FC } from "react";
import useCurrentUser from "@/hooks/current-user/useCurrentUser";

interface Props {
    background: string;
}

const ProfileHeader: FC<Props> = ({ background }) => {
    const user = useCurrentUser();

    return (
        <header
            className="min-h-[27rem] bg-cover bg-center bg-no-repeat relative mb-44"
            style={{ backgroundImage: `url(${background})` }}
        >
            <Header className="w-full bg-transparent text-white" />

            <div className="absolute top-[70%] left-[50%] translate-x-[-50%] z-10 flex flex-col justify-center min-h-[20rem] max-w-md w-full">
                <picture className="flex justify-center items-center mb-3">
                    <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="object-cover aspect-square rounded-full h-40 w-40 border-4 border-white bg-white shadow-xl"
                    />
                </picture>
                <div className="w-full">
                    <h1 className="text-lg font-bold text-center">{user?.name}</h1>
                    <p className="text-md text-center">{user?.email}</p>
                </div>
            </div>
        </header>
    );
};

export default ProfileHeader;
