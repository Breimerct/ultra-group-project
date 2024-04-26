"use client";

import { useUserStore } from "@store/user-store/user.store";
import { useEffect, useState } from "react";

const useCurrentUser = () => {
    const { user, getUser } = useUserStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        !user && setLoading(true);

        const storedUser = JSON.parse(sessionStorage?.user || "null");

        if (!user && !!storedUser) {
            getUser(storedUser?._id).finally(() => setLoading(false));
        }

        return () => {};
    }, [user, loading]);

    return { user, loading };
};

export default useCurrentUser;
