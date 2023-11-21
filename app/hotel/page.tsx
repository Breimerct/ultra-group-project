import { FC } from "react";
import HotelList from "./components/hotel-list/HotelList";

interface IProps {}

const HotelPage: FC<IProps> = () => {
    return (
        <div>
            <section>
                <HotelList />
            </section>
        </div>
    );
};

export default HotelPage;
