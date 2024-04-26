"use client";

import { useUserStore } from "@/app/store/user-store/user.store";
import { useEffect } from "react";

const useCurrentUser = () => {
    const { user, getUser } = useUserStore();

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage?.user || "null");

        if (!user && storedUser?._id) {
            getUser(storedUser?._id);
        }

        return () => {};
    }, [user]);

    return user;
};

export default useCurrentUser;
