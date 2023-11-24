import { FC } from "react";
import HotelsTable from "./components/hotels/HotelsTable";
import RoomsTable from "./components/rooms/RoomsTable";

const DashboardPage: FC = () => {
    return (
        <div className="grid gap-5">
            <h1>Dashboard</h1>
            <div>
                <h2>Hotels</h2>
                <div>
                    <HotelsTable />
                </div>
            </div>

            <div>
                <h2>Habitaciones</h2>
                <div>
                    <RoomsTable />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
