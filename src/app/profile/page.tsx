import { FC } from "react";
import ProfileHeader from "@components/profile-header/ProfileHeader";
import ProtectedRoute from "@components/protected-route/ProtectedRoute";
import ProfileUserInfo from "./components/profile-user-info/ProfileUserInfo";
import ChangePassword from "./components/change-password/ChangePassword";

const ProfilePage: FC = () => {
    return (
        <ProtectedRoute>
            <ProfileHeader background="/background-profile-page.webp" />

            <main className="w-full p-10 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
                <section className="col-span-1 w-full bg-white rounded-lg shadow-md p-5">
                    <ProfileUserInfo />
                </section>

                <section className="col-span-1 w-full bg-white rounded-lg shadow-md p-5">
                    <ChangePassword />
                </section>
            </main>
        </ProtectedRoute>
    );
};

export default ProfilePage;
