"use client";
import { FC } from "react";
import { useCommonStore } from "@store/common-store/common.store";

const Loading: FC = () => {
    const { isLoading } = useCommonStore();

    return (
        !isLoading && (
            <div className="absolute top-0 bottom-0 min-h-screen bg-slate-200 w-full grid place-content-center">
                <h1 className="text-5xl text-center font-bold">Cargando...</h1>
                <p className="text-center text-lg">por favor espere.</p>
            </div>
        )
    );
};

export default Loading;
