import { FC } from "react";
import ProfileHeader from "../components/profile-header/ProfileHeader";
import ProtectedRoute from "../components/protected-route/ProtectedRoute";
import ProfileUserInfo from "./components/profile-user-info/ProfileUserInfo";
import ChangePassword from "./components/change-password/ChangePassword";

const ProfilePage: FC = () => {
    return (
        <ProtectedRoute>
            <ProfileHeader background="/background-profile-page.webp" />

            <main className="w-full p-10 mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
                <h1 className="col-span-2 text-2xl font-semibold mb-3">Datos del usuario</h1>

                <section className="col-span-1 md:col-span-1 bg-white rounded-lg shadow-md p-5">
                    <ProfileUserInfo />
                </section>

                <section className="col-span-1 md:col-span-1 bg-white rounded-lg shadow-md p-5">
                    <ChangePassword />
                </section>
            </main>
        </ProtectedRoute>
    );
};

export default ProfilePage;
