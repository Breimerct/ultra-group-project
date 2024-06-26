"use client";

import { useCommonStore } from "@store/common-store/common.store";
import { useEffect } from "react";

const CustomLoading = () => {
    const { isLoading } = useCommonStore();

    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isLoading]);

    return (
        <>
            {isLoading && (
                <div className="loading fixed top-0 left-0 backdrop-blur-[3px] h-screen w-screen z-50">
                    <div className="w-full h-full flex justify-center items-center">
                        <figure className="animate-spin">
                            <svg
                                width="100"
                                height="100"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                fill="none"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 6l0 -3" />
                                <path d="M16.25 7.75l2.15 -2.15" />
                                <path d="M18 12l3 0" />
                                <path d="M16.25 16.25l2.15 2.15" />
                                <path d="M12 18l0 3" />
                                <path d="M7.75 16.25l-2.15 2.15" />
                                <path d="M6 12l-3 0" />
                                <path d="M7.75 7.75l-2.15 -2.15" />
                            </svg>
                        </figure>
                    </div>
                </div>
            )}
        </>
    );
};

export default CustomLoading;
