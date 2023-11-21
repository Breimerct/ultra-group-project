import { FC } from "react";
import HotelList from "./components/hotel-list/HotelList";

interface IProps {}

const HotelPage: FC<IProps> = () => {
    return (
        <div>
            <h1>Hotel Page</h1>

            <section>
                <HotelList />
            </section>
        </div>
    );
};

export default HotelPage;
