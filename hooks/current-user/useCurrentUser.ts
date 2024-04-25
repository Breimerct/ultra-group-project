"use client";

import { useUserStore } from "@/app/store/user-store/user.store";
import { IUser } from "@/types";
import { useEffect, useState } from "react";

const useCurrentUser = () => {
    const { setUser, user } = useUserStore();
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage?.user || "null");

        setCurrentUser(storedUser);

        if (!user) {
            setUser(storedUser);
        }

        return () => {};
    }, [user]);

    return user;
};

export default useCurrentUser;
